const s3Url = import.meta.env.VITE_S3_URL;
const s3Bucket = import.meta.env.VITE_S3_BUCKET;

export default function getImageUrl(imageKey: string): string {

    if(!imageKey) return ''

    return `${s3Url}/${s3Bucket}/${imageKey}`

}