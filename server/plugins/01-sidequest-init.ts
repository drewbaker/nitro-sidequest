import { useRuntimeConfig, defineNitroPlugin } from "nitropack/runtime";
import { Sidequest } from "sidequest";

let sidequestStarted = false;

export async function initializeSidequest() {
    if (sidequestStarted) {
        return;
    }

    const { dbUrl } = useRuntimeConfig();

    if (!dbUrl) {
        console.warn("[Sidequest] supabaseDbUrl not configured, skipping Sidequest initialization");
        return;
    }

    try {
        await Sidequest.start({
            backend: {
                driver: "@sidequest/postgres-backend",
                config: dbUrl,
            },
            queues: [
                { name: "template-default", concurrency: 1, priority: 100, state: 'active' },
            ],
            dashboard: {
                enabled: true,
                port: 8678,
                basePath: "/admin/",
            },
            manualJobResolution: true
        });

        sidequestStarted = true;
        console.log("[Sidequest] Initialized successfully");
    } catch (error) {
        console.error("[Sidequest] Failed to initialize:", error);
    }
}

export default defineNitroPlugin(async (nitroApp) => {
    await initializeSidequest();

    // Handle graceful shutdown
    nitroApp.hooks.hook("close", async () => {
        if (sidequestStarted) {
            await Sidequest.stop();
            console.log("[Sidequest] Stopped gracefully");
        }
    });
});