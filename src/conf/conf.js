const getEnv = (value) => {
    if (typeof value !== "string") return "";
    return value.trim().replace(/^['"]|['"]$/g, "");
};

const normalizeUrl = (value) => {
    const url = getEnv(value);
    return url.endsWith("/") ? url.slice(0, -1) : url;
};

const conf = {
    appwriteUrl: normalizeUrl(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: getEnv(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: getEnv(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: getEnv(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: getEnv(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

if (!conf.appwriteUrl) {
    console.error("Missing required environment variable: VITE_APPWRITE_URL");
}
if (!conf.appwriteProjectId) {
    console.error("Missing required environment variable: VITE_APPWRITE_PROJECT_ID");
}
if (!conf.appwriteDatabaseId) {
    console.error("Missing required environment variable: VITE_APPWRITE_DATABASE_ID");
}
if (!conf.appwriteCollectionId) {
    console.error("Missing required environment variable: VITE_APPWRITE_COLLECTION_ID");
}
if (!conf.appwriteBucketId) {
    console.error("Missing required environment variable: VITE_APPWRITE_BUCKET_ID");
}

export default conf