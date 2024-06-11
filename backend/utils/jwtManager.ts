import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/types.js';

const generate = (id:string) => jwt.sign({id}, process.env.JWT_SECRET!, {expiresIn: '2h'});

const verify = (token:string): JwtPayload => jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
// id: This is a private claim. In this case, it appears to be a UUID that uniquely identifies a user. 
// This is likely the user ID from your database.

// iat: This is a registered claim and stands for "Issued At". It tells when the JWT was issued. 
// It is a timestamp representing seconds since the Unix epoch (1970-01-01T00:00:00Z UTC). In your case, 
// the value 1717198658 corresponds to a date in the future (2024-05-01T09:04:18Z), which suggests that the 
// system clock that issued this token may be incorrect.

// exp: This is a registered claim and stands for "Expiration Time". It tells when the JWT is no longer valid 
// and should not be accepted. It is also a timestamp representing seconds since the Unix epoch. In your case, 
// the value 1717205858 corresponds to a date in the future (2024-05-01T11:04:18Z), two hours after the iat time.

export { generate, verify };