'use client';
import { LoginResponseBody, RequestUserProfile, UpdateUserRequestBody } from "../../shared/types";

const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;
const userHeader = {
    "Content-Type": "application/json",
    "Authorization": 'Bearer ' + window.localStorage.getItem("token")
};
export const fetchAPI = async (url: string, options = {}) => {
    const response = await fetch(`${baseUrl}${url}`, options);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export const fetchUserProfile = async() => {
    try {
        const data: RequestUserProfile = await fetchAPI('/user/profile', { headers: userHeader });
        // console.log('data:', data); // TESTING
        return data;
    } catch (error) {
        throw error;
    }
};

export const updateUserProfile = async(newUserRequest:UpdateUserRequestBody) => {
    try {
        const data: LoginResponseBody = await fetchAPI(`/user/profile`, {
            method:"PUT",
            headers: userHeader,
            body: JSON.stringify(newUserRequest),
        });
        // console.log('data:', data); // TESTING
        return data;
    } catch (error) {
        throw error;
    }
};

// export const fetchUserPicture = async(id:string) => {
//     try {
//         const data = await fetchAPI(`/user/image/${id}`);
//         console.log('data:', data); // TESTING
//         return data;
//     } catch (error) {
//         throw error;
//     }
// };
// export const fetchPostPicture = async(id:string) => {
//     try {
//         const data = await fetchAPI(`/post/image/${id}`);
//         console.log('data:', data); // TESTING
//         return data;
//     } catch (error) {
//         throw error;
//     }
// };

// export const getUserPicture = (id:string) => process.env.NEXT_PUBLIC_S3_BUCKET_NAME + '/profile_picture/' + id;
// export const getPostPicture = (id:string) => process.env.NEXT_PUBLIC_S3_BUCKET_NAME + '/post_picture/' + id;
// export const getPictureWithKey = (key:string) => process.env.NEXT_PUBLIC_S3_BUCKET_NAME + '/' + key;
export const getUserPicture = (id:string) => '/profile_picture/' + id;
export const getPostPicture = (id:string) => '/post_picture/' + id;
export const getPictureWithKey = (key:string) => '/' + key;

/**
 * Uploads a picture, which can be either a profile picture or a post picture.
 *
 * @param imageOutputFile - The file to be uploaded. If null, the function will log an error and return.
 * @param isPost - If true, the file is a post picture. If false, the file is a profile picture.
 * @param id - If isPost is true, this should be the post id. If isPost is false, this should be the user id.
 * @returns - The function returns a Promise that resolves to the response of the fetch API call.
 */
export const uploadPicture = async(imageOutputFile:File | null, isPost:boolean, id:string) => {
    if(imageOutputFile === null){
        console.error('No Upload Picture');
        return;
    }
    const formData = new FormData();
    if(!isPost){
        formData.append('profile_picture', imageOutputFile); 
        formData.append('user_id', id);
    }else{
        formData.append('post_picture', imageOutputFile); 
        formData.append('post_id', id);
    }

    // const bytes = await imageOutputFile.arrayBuffer()
    // const buffer = Buffer.from(bytes);

    const url = isPost ? `/post/image/${id}` : `/user/image/${id}`;
    const response = await fetchAPI(url, {
        method: 'POST',
        // headers: userHeader,
        body: formData
    });
    console.log('formdata:', formData);
    console.log('url:', url);
    return response;
};
