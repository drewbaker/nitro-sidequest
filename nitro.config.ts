import { defineNitroConfig } from "nitropack/config";

export default defineNitroConfig({
    srcDir: "server",
    compatibilityDate: "2024-11-13",
    errorHandler: "~/error-handler.ts",
    runtimeConfig: {
        dbUrl: "",
        apiUrl: "",
    },
    routeRules: {
        '/admin/**': {
            proxy: 'http://localhost:8678/admin/**',
        }
    },
    imports: {
        dirs: [
            "./sidequest.jobs.js"
        ],
    },
    externals: {
        // Ensure Nitro copies the dashboard's non-JS assets into .output
        traceInclude: ['node_modules/@sidequest/dashboard'],
    },
});