import { 
    Request, 
    Response, 
    NextFunction, 
} from "express";

// export interface AuthRequest extends Request {
//     userId:string;
//     // user: IUser;
//     cookies: {
//         jwt: string;
//     };
// }

export type VerifiedUser = {
    id: string;
    username: string;
    email: string;
    bio: string | null;
    profile_image_URL: string | null;
    created_at: Date;
};

export type PhotoFile = {
    buffer:string;
    originalName: string;
};

export type JwtPayload = {
    id: string;
    iat: number;
    exp: number;
};

// export interface AuthRequest extends Request {
//     user: VerifiedUser;
// };
export type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;
export type RequestHandler = (req: Request, res: Response, next: NextFunction) => void;
export type TAsyncHandler = (fn: AsyncFunction) => RequestHandler;
export type ErrorAsyncFunction = (err: Error, req: Request, res: Response, next: NextFunction) => void;



// export type AsyncFunction<T extends Request = Request> = (req: T, res: Response, next: NextFunction) => Promise<any>;
// export type RequestHandler<T extends Request = Request> = (req: T, res: Response, next: NextFunction) => void;
// export type TAsyncHandler = <T extends Request = Request>(fn: AsyncFunction<T>) => RequestHandler<T>;
// export type ErrorAsyncFunction = (err: any, req: Request, res: Response, next: NextFunction) => void;
// export type ErrorAsyncFunction = <T extends Request = Request>(err: any, req: T, res: Response, next: NextFunction) => void;

