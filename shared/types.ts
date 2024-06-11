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

export type PictureRequestBody = {
    id: string;
};

export type RequestUserProfile = {
    id: string;
    username: string;
    email: string;
    password: string;
    bio: string | null;
    profile_image_URL: string | null;
    created_at: Date;
};

export type TBusiness = {
    created_at: Date;
    id: string;
    business_name: string;
    address: string;
    phone_number: string | null;
    star_rating: number | null;
    review_count: number | null;
}

export type ResponseBusiness = {
    businesses: TBusiness[];
};

export type TPostResponseData = {
    business_id: string;
    id: string;
    created_at: Date;
    user_id: string;
    caption: string | null;
    review: string | null;
    post_url: string | null;
};

export type GetAllPostResponseData = {
    id: string;
    user_id: string;
    created_at: Date;
    business_id: string;
    caption: string | null;
    review: string | null;
    post_url: string | null;
};

export type UserResponseData = {
    id: string;
    username: string;
    email: string;
    bio: string | null;
    profile_image_URL: string | null;
    created_at: Date;
};