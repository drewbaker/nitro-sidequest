/* 
* Global error handler. 
* Endpoints should throw and error, this will catch it and return a standardized error response. 
* 
*   throw createError({
*      status: 400,
*      statusMessage: "Bad Request",
*      message: "Invalid user input", // This is the message that will be returned to the client
*      data: { field: "email" } // Optional data to return to the client
*    });
*/

// import * as Sentry from "@sentry/node";
import { setResponseHeader, send } from "h3";
import { defineNitroErrorHandler } from "nitropack/runtime";

export default defineNitroErrorHandler((error, event) => {
    const code = error.code || error.statusCode || error.status || error.cause?.statusCode || null

    console.error(`[API Error] - URL: ${event.node?.req?.method} ${event.node?.req?.url}, Code: ${code}, Message: ${error.message}`);

    // TODO Log to Sentry

    setResponseHeader(event, 'Content-Type', 'application/json')

    // Create error response
    const output = {
        error: {
            code: code,
            message: error.message,
        }
    }

    // Return error response
    return send(event, JSON.stringify(output))
});