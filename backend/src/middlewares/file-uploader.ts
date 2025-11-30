import { Upload } from "@aws-sdk/lib-storage";
import { NextFunction, Request, Response } from "express";
import s3Client, { bucket } from "../aws/aws";
import { UploadedFile } from "express-fileupload";
import { randomUUID } from "crypto";
import { extname } from "path";

declare global {
    namespace Express {
        interface Request {
            imageKey: string
            // imageUrl: string
        }
    }
}

export default async function fileUploader(req: Request, res: Response, next: NextFunction) {

    try {

        if(!req.files || !req.files.image) return next()

        console.log(req.files)

        const { mimetype, data, name } = req.files.image as UploadedFile

        const filename = `${randomUUID()}${extname(name)}`; // e.g. 1234.png
        const key = `vacations/${filename}`; 

        const upload = new Upload({
            client: s3Client,
            params: {
                Bucket: bucket,
                Key: key,
                ContentType: mimetype,
                Body: data
            }
        })

        await upload.done()


        req.imageKey = key
        // req.imageUrl = `${endpoint}/${bucket}/${key}`
        
        // const url = new URL(result.Location)
        // req.imageUrl = url.pathname
        next()

    } catch(e) {
        next({
            status: 500,
            message: 'Image upload failed',
            details: e
        })
    }

}