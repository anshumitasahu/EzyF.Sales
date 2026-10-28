import axios from "axios";

export const NEON_FUNCTIONS_URL = import.meta.env.VITE_NEON_FUNCTION_URL || import.meta.env.VITE_NEON_AUTH_URL;

if (!NEON_FUNCTIONS_URL) {
    throw new Error("not found in env")
}

console.log("NEON_FUNCTIONS_URL:", NEON_FUNCTIONS_URL);

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:4000",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    if (NEON_FUNCTIONS_URL && config.url) {
        const isPublicRead =
            (!config.method || config.method.toLowerCase() === "get") &&
            (config.url.startsWith("/api/products") ||
                config.url.startsWith("/api/store/slug/") ||
                config.url.startsWith("/api/store/public/featured"));

        console.log("NEON DEBUG:", {
            url: config.url,
            method: config.method,
            neonUrl: NEON_FUNCTIONS_URL,
            isPublicRead,
        });

        if (isPublicRead) {
            config.baseURL = NEON_FUNCTIONS_URL;
        }
    }

    const token = localStorage.getItem("EzyF_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("API request:", config.method, config.baseURL, config.url);
    return config;
});