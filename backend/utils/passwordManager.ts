import * as bcrypt from "bcrypt-ts";

const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
};

type TComparePassword = (
    password: string,
    existing_password: string
) => Promise<boolean>;
const comparePassword: TComparePassword = async (password, existing_password) =>
    await bcrypt.compare(password, existing_password);

export { hashPassword, comparePassword };
