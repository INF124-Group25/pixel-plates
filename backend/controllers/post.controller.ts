import { getPhoto } from "bucket/s3";
import asyncMiddleware from "middleware/asyncMiddleware";


export const getPhotoPost = asyncMiddleware(async(req, res, next) => {
    const {Body, ContentType, Key} = await getPhoto(req.params.id);
    res.setHeader('Content-Disposition', `attachment; filename="${Key}"`);
    res.setHeader('Content-Type', ContentType);
    res.send(Body);
});