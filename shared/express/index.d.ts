import express from 'express';
import { VerifiedUser, PhotoFile } from '../types';
declare global {
    namespace Express {
        interface Request {
            user?:VerifiedUser;
            file?: PhotoFile;
        }
    };
};