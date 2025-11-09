import { TemplateProcessJob } from "#root/jobs/template-process.job.ts";

/**
 * NOTE
 * This file is used to import the job classes into the Nitro server, and then make them available to the Sidequest job runner.
 * In your Nitro routes, be sure to import the job classes from this file, and not from the jobs directory directly.
 */

// Export all job classes
export {
    TemplateProcessJob,
};