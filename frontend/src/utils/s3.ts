const s3Url = import.meta.env.VITE_S3_URL;
const s3Bucket = import.meta.env.VITE_S3_BUCKET;

export default function getImageUrl(imageName: string): string {
    if (!imageName) return "";

    const isCompose =
        window.location.origin.includes("3012") ||
        window.location.hostname === "localhost";

    const base = s3Url;
    const bucket = s3Bucket;

    if (isCompose) {
        return `${base}/${bucket}/${imageName}`;
    }

    return `${base}/${bucket}/${imageName}`;
}