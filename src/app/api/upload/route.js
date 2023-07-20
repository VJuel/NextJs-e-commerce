import multiparty from 'multiparty';
import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
import fs from 'fs';
import mime from 'mime-types';
import mongooseConnect from "@/src/lib/mongoose";
import {NextResponse} from "next/server";
// import {NextResponse} from "next/server";
const bucketName = process.env.BUCKETNAME
export async function POST(req,res) {
    await mongooseConnect();
    const data = await req.formData();
    console.log(data)
    // const data = await req.formData();
    // const file = await data.get('file');
    const form = new multiparty.Form();
    // const {fields,files} = await new Promise((resolve,reject) => {
    //     form.parse(req, (err, fields, files) => {
    //         if (err) reject(err);
    //         resolve({fields,files});
    //     });
    // });
    const client = new S3Client({
        region: process.env.S3_REGION,
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        },
    });
    console.log(file)
    console.log(file.path)
    const links = [];
        const ext = file.name.split('.').pop();
        const newFilename = Date.now() + '.' + ext;
        await client.send(new PutObjectCommand({
            Bucket: bucketName,
            Key: newFilename,
            Body: fs.readFile(file.path, function (err, data) {
                if (err) throw err;
            }),
            ACL: 'public-read',
            ContentType: mime.lookup(file.path),
        }));
        const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
        links.push(link);
    return NextResponse.json({links});
}

export const config = {
    api: {bodyParser: false},
};
