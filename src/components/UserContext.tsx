"use client";

import { fetchAPI } from "@/services/api";
import { createContext, useEffect, useState } from "react";
import { LoginResponseBody } from "~shared/types";


export type UserContextType = {
    // login: (username: string, password: string) => void;
    user: LoginResponseBody | null;
    loading: boolean;
    userToken: string | null;
    setUser: React.Dispatch<React.SetStateAction<LoginResponseBody | null>>;
    setUserToken: React.Dispatch<React.SetStateAction<string | null>>;
    // logout: () => void;
    isUserAuthenticated: () => boolean;
    setupLocalUser: () => void;
};

export const Context = createContext<UserContextType | null>(null);

const UserContext = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<LoginResponseBody | null>(null);
    const [userToken, setUserToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // const login = async(username:string, password:string) => {
    //     try {
    //         setLoading(true);
    //         const data: LoginResponseBody = await fetchAPI('/auth/login', {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 username: username,
    //                 password: password,
    //             }),
    //         });
    //         setUserToken(data.token);
    //         setUser(data);
    //         localStorage.setItem('token', data.token);
    //         // maybe set localstorage for user ?
    //         console.log("Login submitted", { username, password });
    //         // notifyUserloginSuccess();
    //         // router.push('/profile');
    //     } catch (error) {
    //         // notifyUserloginFailure();
    //         console.error("Error when logging in:", error);
    //     }finally{
    //         setLoading(false);
    //     }
    // };
    // const logout = () => {
    //     setUserToken(null);
    //     setUser(null);
    //     localStorage.removeItem("userToken");
    //     localStorage.removeItem("user");
    //     router.push("/login");
    // };

    const isUserAuthenticated = () => !!userToken;

    const setupLocalUser = () => {
        const user = localStorage.getItem('user');
        if(user){
            setUser(JSON.parse(user) as LoginResponseBody);
        }else{
            setUser(null);
        }
        setUserToken(localStorage.getItem('token'));
    };

    useEffect(() => setupLocalUser(), []);

    return (
        <Context.Provider
            value={{
                user,
                loading,
                userToken,
                setUser,
                setUserToken,
                isUserAuthenticated,
                setupLocalUser
            }}
        >
            {children}
        </Context.Provider>
    );
};

export default UserContext;