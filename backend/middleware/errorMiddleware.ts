import { ErrorAsyncFunction } from "../types/types";
import { Request, Response, NextFunction } from "express";
const errorMiddleware: ErrorAsyncFunction = (err:Error, req:Request, res:Response, next:NextFunction) => {
    const errorObject = {
        message: err.message,
        stack:
            process.env.NODE_ENV === "test"
                ? undefined
                : err.stack
    };
    console.error(errorObject);
    res.status(res.statusCode < 400 ? 400 : res.statusCode || 500).send(errorObject);
};

export default errorMiddleware;