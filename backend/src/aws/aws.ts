import { CreateBucketCommand, S3Client, ListObjectsV2Command, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { readdirSync, readFileSync } from 'fs';
import config from 'config'
import { extname, join } from 'path';

// const s3Connection = JSON.parse(JSON.stringify(config.get<object>('s3.connection')))
const rawConnection = config.get<any>('s3.connection')

const s3Connection = {
    ...rawConnection,
    credentials: {...rawConnection.credentials}
}

s3Connection.forcePathStyle = true

s3Connection.region = s3Connection.region || "us-east-1"

if(!config.get<boolean>('s3.isLocalStack')) delete s3Connection.endpoint

export const bucket = config.get<string>('s3.bucket')
// export const endpoint = config.get<string>('s3.connection.endpoint')

const s3Client = new S3Client(s3Connection)
export default s3Client
console.log(s3Connection)

export async function createAppBucketIfNotExists() {
    try {
        const result = await s3Client.send(
            new CreateBucketCommand({
                Bucket: bucket
            })
        )
        console.log(result)
    } catch(e) {
        console.log('bucket creation failed. silenting exception, probably already exists: ', e)
    }
}

export async function testUpload() {
    try {
        const upload = new Upload({
            client: s3Client,
            params: ({
                Bucket: bucket,
                Key: 'test.txt',
                ContentType: 'text/plain',
                Body: 'hello world, localstack seems to work'
            })
        })

        const result = await upload.done()
        console.log('upload result:', result)
    } catch(e) {
        console.log('exception in test upload: ', e)
    }
}

export async function seedInitialImagesIfNeeded() {
    // check if bucket already has seed images
    const existing = await s3Client.send(new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: "seed/"
    }));

    if (existing.Contents && existing.Contents.length > 0) {
        console.log("Seed images already exist in bucket, skipping seeding.");
        return;
    }
    
    const imagesPath = join(process.cwd(), "images");
    const files = readdirSync(imagesPath);

    const tasks = files.map(async (file) => {
    const body = readFileSync(join(imagesPath, file));

    try {
        await new Upload({
            client: s3Client,
            params: {
                Bucket: bucket,
                Key: `seed/${file}`,
                Body: body,
                ContentType: `image/${extname(file).replace('.', '')}`,
            },
        }).done();

            console.log(`Seeded ${file}`);
        } catch (e) {
            console.log(`Skipping ${file}`, e || '');
        }
    });

    await Promise.allSettled(tasks);
}

export async function deleteImage(key: string) {

    try {
        await s3Client.send(
            new DeleteObjectCommand({
                Bucket: bucket,
                Key: key
            })
        )
    } catch(e) {
        console.log("Failed to delete image: ", key, e)
    }

}