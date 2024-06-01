import express from 'express';
import { VerifiedUser } from '../types';
declare global {
    namespace Express {
        interface Request {
            user?:VerifiedUser
        }
    };
};