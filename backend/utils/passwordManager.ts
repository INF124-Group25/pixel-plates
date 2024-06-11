// import {genSalt, compare, hash} from "bcrypt-ts";
// import { genSalt, compare, hash } from "bcrypt-ts";
// const { genSalt, compare, hash } = await import("bcrypt-ts");


const hashPassword = async (password: string): Promise<string> => {
    const { genSalt, hash } = await import("bcrypt-ts");
    const salt = await genSalt();
    return await hash(password, salt);
};

type TComparePassword = (
    password: string,
    existing_password: string
) => Promise<boolean>;
const comparePassword: TComparePassword = async (password, existing_password) =>{
    const {  compare } = await import("bcrypt-ts");
    return (await compare(password, existing_password));
}
export { hashPassword, comparePassword };
