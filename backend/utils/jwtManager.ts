import jwt from 'jsonwebtoken';

const generate = (id:string) => jwt.sign({id}, process.env.SECRET!, {expiresIn: '24h'});
const verify = (token:string) => jwt.verify(token, process.env.SECRET!)

export { generate, verify };