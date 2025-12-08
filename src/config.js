export const BASE_URL =
  import.meta.env.VITE_DEPLOYEMENT == "DEVELOPMENT"
    ? import.meta.env.VITE_BASEURL_DEV
    : import.meta.env.VITE_BASEURL_PROD;
