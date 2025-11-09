import { Job } from "sidequest";
import { $fetch } from "ofetch";

type TemplateProcessJobParams = {
    templateId: string;
};

export class TemplateProcessJob extends Job {
    async run({ templateId }: TemplateProcessJobParams) {
        console.log(`[Template Process Job] - Starting processing for templateId: ${templateId}`);

        try {

            /**
             * This would be great if it was a local fetch to the same Node server, and avoiding a HTTP request over the network.
             * Maybe can be done with a function call to the route event handler somehow?
             */
            const { data, status } = await $fetch(`/templates/${templateId}/refresh`, {
                baseURL: process.env.NITRO_API_URL, // Unable to use useRuntimeConfig here, as it is not available in the job context.
                method: "POST"
            });

            /**
             * NOTEs
             * 
             * 1) Using useRuntimeConfig to get the API URL does not work in here, as it is not available in the job context.
             * 2) It would be great if we could call a Nitro endpoint here as a function, but I'm not sure how to do that?
             * 3) You have to be really careful with what functions you import here, very easy to break something 
             *    by importing the wrong function that uses a Nitro context or Nitro auto-imports.
             * 4) It would be great if we could use the same Nitro context as the server, but I'm not sure how to do that?
             */

            console.log(`[Template Process Job] - Completed processing for templateId: ${templateId}`);

            return { success: true, templateId, data, status };
        } catch (error) {
            console.error(`[Template Process Job] - Error processing template ${templateId}:`, error);
            throw error;
        }
    }
}