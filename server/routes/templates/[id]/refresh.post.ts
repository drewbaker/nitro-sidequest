import { H3Event, EventHandlerRequest, createError, defineEventHandler, getRouterParam } from "h3";

async function handler(event: H3Event<EventHandlerRequest>) {

    const templateId = getRouterParam(event, "id");

    // Delay for 10 seconds
    await new Promise(resolve => setTimeout(resolve, 10000));

    return {
        success: true,
        templateId: templateId,
        message: "Template refreshed successfully",
    }

}

export default defineEventHandler(handler);