const s3Url = import.meta.env.VITE_S3_URL;
const s3Bucket = import.meta.env.VITE_S3_BUCKET;

export default function getImageUrl(imageName: string): string {
    if (!imageName) return "";

    const isCompose =
        window.location.origin.includes("3012") ||
        window.location.hostname === "localhost";

    const base = isCompose ? "http://localhost:4566" : s3Url;
    const bucket = s3Bucket;

    // Fix path for seeded images in compose:
    const key =
        isCompose && !imageName.includes("/")
            ? `seed/${imageName}`
            : imageName;

    return `${base}/${bucket}/${key}`;
}