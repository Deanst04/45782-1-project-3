import { Upload } from "@aws-sdk/lib-storage";
import { NextFunction, Request, Response } from "express";
import s3Client from "../aws/aws";
import config from 'config'
import { UploadedFile } from "express-fileupload";
import { randomUUID } from "crypto";
import { extname } from "path";
import { URL } from 'url'

declare global {
    namespace Express {
        interface Request {
            imageUrl: string
        }
    }
}

export default async function fileUploader(req: Request, res: Response, next: NextFunction) {

    try {

        if(!req.files) return next()
        if(!req.files.image) return next()

        console.log(req.files)

        const { mimetype, data, name } = req.files.image as UploadedFile

        const filename = `${randomUUID()}${extname(name)}`; // e.g. 1234.png
        const key = `seed/${filename}`; 

        const upload = new Upload({
            client: s3Client,
            params: {
                Bucket: config.get<string>('s3.bucket'),
                Key: key,
                ContentType: mimetype,
                Body: data
            }
        })

        await upload.done()

        req.imageUrl = filename;
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