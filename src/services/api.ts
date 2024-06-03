import { LoginResponseBody, UpdateUserRequestBody } from "~shared/types";

const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;
const userHeader = {
    "Content-Type": "application/json",
    "Authorization": 'Bearer ' + localStorage.getItem("token")
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
        const data: LoginResponseBody = await fetchAPI('/user/me', { headers: userHeader });
        console.log('data:', data); // TESTING
        return data;
    } catch (error) {
        throw error;
    }
};

export const updateUserProfile = async(id:string, newUserRequest:UpdateUserRequestBody) => {
    try {
        const data: LoginResponseBody = await fetchAPI(`/user/${id}`, {
            method:"PUT",
            headers: userHeader,
            body: JSON.stringify(newUserRequest),
        });
        console.log('data:', data); // TESTING
        return data;
    } catch (error) {
        throw error;
    }
};

