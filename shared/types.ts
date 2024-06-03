export type LoginRequestBody = {
    username: string;
    password: string;
};

export type RegisterRequestBody = {
    username: string;
    email: string;
    password: string;
};

export type MyUserRequestBody = {
    token: string;
};

export type LoginResponseBody = {
    id: string;
    username: string;
    email: string;
    bio: string | null;
    profile_image_URL: string | null;
    created_at: Date;
    token: string;
};

export type RegisterResponseBody = {
    id: string;
    username: string;
    email: string;
    bio: string | null;
    profile_image_URL: string | null;
    created_at: Date;
    token: string;
};

export type UpdateUserRequestBody = {
    username: string;
    email:string; 
    password: string;
    bio:string;
    profile_image_URL: string;
};
