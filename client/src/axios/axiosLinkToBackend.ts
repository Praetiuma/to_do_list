import axios from "axios";

interface Secrets {
    apiHost: string;
}

interface Config {
    secrets: Secrets;
}

let cache: Config | null = null;

const environment = import.meta.env.VITE_APP_ENVIRONMENT || "development";

const config = (): Config => {
    if (!cache) {
        cache = Object.freeze({
            secrets: {
                apiHost:
                    environment === "development"
                        ? "http://localhost:3010/"
                        : "http://localhost:3010/",
            },
        });
    }
    return cache;
};

const { apiHost } = config().secrets;

const customAxios = axios.create({
    baseURL: `${apiHost}`,
    // timeout: 30000,
});


export default customAxios;