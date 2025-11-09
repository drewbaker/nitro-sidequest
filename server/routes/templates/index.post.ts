import { H3Event, EventHandlerRequest, createError, defineEventHandler, readBody } from "h3";
import { Sidequest } from "sidequest";
import { TemplateProcessJob } from "#root/sidequest.jobs.js";

async function handler(event: H3Event<EventHandlerRequest>) {
    const body = await readBody(event);
    const { id } = body;

    try {
        // Schedule a template process job
        await Sidequest.build(TemplateProcessJob)
            .queue("template-default")
            .unique({ withArgs: true, period: "minute" })
            .timeout(30000)
            .retryDelay(5000)
            .maxAttempts(10)
            .enqueue({ templateId: id });
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: "Internal Server Error",
            message: "Failed to schedule template process job",
        });
    }

    return {
        success: true,
        templateId: id,
        message: "Template process job scheduled successfully",
    }
}

export default defineEventHandler(handler);