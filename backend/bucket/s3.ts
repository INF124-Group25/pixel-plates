// This is used for getting user input.
import { Readable } from "stream";
import multer from "multer";
import multerS3 from 'multer-s3';
import {
    S3Client,
    ListBucketsCommand,
    PutObjectCommand,
    CreateBucketCommand,
    DeleteObjectCommand,
    DeleteBucketCommand,
    paginateListObjectsV2,
    GetObjectCommand,
} from "@aws-sdk/client-s3";
import { Request } from 'express';
import asyncMiddleware from "middleware/asyncMiddleware";
import { PictureRequestBody } from "~shared/types";






const region = process.env.S3_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const BUCKET_NAME = process.env.S3_BUCKET;
if(!region || !accessKeyId || !secretAccessKey || !BUCKET_NAME){
    throw new Error('S3 environment variables not initialized');
}
const s3Client = new S3Client({
    region: region,
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
    },
});

export const upload = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: BUCKET_NAME,
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req:Request, file, cb) {
            // const { id } = req.body as PictureRequestBody;
            const { id } = req.params;
            // cb(null, Date.now().toString());
            cb(null, `${file.fieldname}/${id}`);
        }
    }), 
    limits: {
        fileSize: 5 * 1024 * 1024, // limit file size to 5MB
    },
});

// let obj = { 
//     fieldname: 'profile_picture', 
//     originalname: 'bit-bytes.png', 
//     encoding: '7bit', 
//     mimetype: 'image/png', 
//     size: 3606166, 
//     bucket: 'prettypixel', 
//     key: '1717823971094', 
//     acl: 'private', 
//     contentType: 'application/octet-stream', 
//     contentDisposition: null, 
//     contentEncoding: null, 
//     storageClass: 'STANDARD', 
//     serverSideEncryption: null, 
//     metadata: { fieldName: 'profile_picture' }, 
//     location: 'https://prettypixel.s3.us-west-1.amazonaws.com/1717823971094', 
//     etag: '"e8d25b8a4c3f98ea12110a5fa7f5d088"', versionId: undefined 
// };

export const pictureResults = asyncMiddleware(async(req, res, next) => {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    res.send(req.file);
});


export const getPhoto = async(id:string) => {
    const params = {
        Bucket: BUCKET_NAME,
        Key: id,
    };
    const {Body, ContentType, Metadata} = await s3Client.send( new GetObjectCommand(params));
    if(!(Body instanceof Readable)){
        throw new Error('Expected a readable stream');
    }
    if(!ContentType){
        throw new Error('No content type');
    }
    if(!Metadata || !Metadata.key){
        throw new Error('No metadata');
    }
    return {Body, ContentType, Key:Metadata.key};
};

// export const getPhoto = asyncMiddleware(async(req, res, next) => {
//     const { id } = req.body as PictureRequestBody;
//     const params = {
//         Bucket: BUCKET_NAME,
//         Key: `profile_picture/${id}`,
//     };
//     try {
//         const {Body} = await s3Client.send( new GetObjectCommand(params));
//         if(!(Body instanceof Readable)){
//             throw new Error('Expected a readable stream');
//         }
//         res.send(Body);
//     } catch (error) {
//         console.log('s3 error:', error);//TESTING
//     }
// });

export const test = async() => {


    const params = {
        Bucket: BUCKET_NAME,
        Key: 'somsa.jpg',
        // Key: req.file.originalname,
        // Body: fileStream,
    };
    try {
        const {Body} = await s3Client.send( new GetObjectCommand(params));
        if(!(Body instanceof Readable)){
            throw new Error('Expected a readable stream');
        }
        return Body;
    } catch (error) {
        console.log('s3 error:', error);//TESTING
    }


};

export const closeS3Client = () => s3Client.destroy();

/*

// Set up multer for file uploads
const upload = multer({ dest: "uploads/" });

type S3Bucket = {
    Bucket: string,
    Key: string,
    Body: Readable
};

const uploadPhotoToS3 = asyncMiddleware(async(req:Request, res:Response, next:NextFunction) => {
    if(!req.file){
        res.status(400);
        throw new Error('No file provided');
    }
    const fileStream = Readable.from(req.file.buffer);

    const params = {
        Bucket: "YOUR_S3_BUCKET_NAME",
        Key: req.file.originalName,
        Body: fileStream,
    };

    try {
        await s3Client.send(new PutObjectCommand(params));
        console.log("File uploaded successfully");
        res.status(200).send("File uploaded");
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to upload file");
    }
});

/*

app.post("/upload", upload.single("file"), async (req, res) => {
    const fileStream = Readable.from(req.file.buffer);

    const params = {
        Bucket: "YOUR_S3_BUCKET_NAME",
        Key: req.file.originalname,
        Body: fileStream,
    };

    try {
        await s3Client.send(new PutObjectCommand(params));
        console.log("File uploaded successfully");
        res.status(200).send("File uploaded");
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to upload file");
    }
});

*/
// Define a route to handle file uploads

/*
export async function main() {
    // A region and credentials can be declared explicitly. For example
    // `new S3Client({ region: 'us-east-1', credentials: {...} })` would
    //initialize the client with those settings. However, the SDK will
    // use your local configuration and credentials if those properties
    // are not defined here.
    const s3Client = new S3Client({});

    // Create an Amazon S3 bucket. The epoch timestamp is appended
    // to the name to make it unique.
    const bucketName = `test-bucket-${Date.now()}`;
    await s3Client.send(
        new CreateBucketCommand({
            Bucket: bucketName,
        })
    );

    // Put an object into an Amazon S3 bucket.
    await s3Client.send(
        new PutObjectCommand({
            Bucket: bucketName,
            Key: "my-first-object.txt",
            Body: "Hello JavaScript SDK!",
        })
    );

    // Read the object.
    const { Body } = await s3Client.send(
        new GetObjectCommand({
            Bucket: bucketName,
            Key: "my-first-object.txt",
        })
    );

    console.log(await Body.transformToString());

    // Confirm resource deletion.
    const prompt = createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const result = await prompt.question("Empty and delete bucket? (y/n) ");
    prompt.close();

    if (result === "y") {
        // Create an async iterator over lists of objects in a bucket.
        const paginator = paginateListObjectsV2(
            { client: s3Client },
            { Bucket: bucketName }
        );
        for await (const page of paginator) {
            const objects = page.Contents;
            if (objects) {
                // For every object in each page, delete it.
                for (const object of objects) {
                    await s3Client.send(
                        new DeleteObjectCommand({
                            Bucket: bucketName,
                            Key: object.Key,
                        })
                    );
                }
            }
        }

        // Once all the objects are gone, the bucket can be deleted.
        await s3Client.send(new DeleteBucketCommand({ Bucket: bucketName }));
    }
}

// Call a function if this file was run directly. This allows the file
// to be runnable without running on import.
import { fileURLToPath } from "url";
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    main();
}

*/