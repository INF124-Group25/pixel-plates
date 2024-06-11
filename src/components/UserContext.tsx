"use client";
import { fetchAPI, fetchUserProfile } from "../services/api";
import { createContext, useEffect, useState } from "react";
import { RequestUserProfile } from "../../shared/types";
import { useRouter } from "next/navigation";
export type UserContextType = {
    user: RequestUserProfile | null;
    loading: boolean;
    login: () => Promise<void>, 
    logout: () => void,
    redirectToLogin: () => void,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    updateUser: () => Promise<void>,
};



export const Context = createContext<UserContextType | null>(null);

const UserContext = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<RequestUserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const redirectToLogin = () => router.push('/login');

    const updateUser = async () => {
        if(typeof window !== 'undefined'){
            setLoading(true);
            try {
                const userData = await fetchUserProfile();
                // console.log('userData:', userData); // TESTING
                setUser(userData);

            } catch (error) {
                localStorage.removeItem("token");
                // router.push("/login");
                console.error("Token is invalid!:", error);
            }finally{
                setLoading(false);
            }
        }else{
            console.error('Window is undefined');
        }
    };

    const login = async () => {
        if(typeof window !== 'undefined'){
            const token = window.localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const userData = await fetchUserProfile();
                // console.log('userData:', userData); // TESTING
                setUser(userData);
            } catch (error) {
                localStorage.removeItem("token");
                // router.push("/login");
                console.error("Token is invalid!:", error);
            } finally {
                setLoading(false);
            }
        }else{
            console.log('Window is undefined');
        }
    };
    const logout = () => {
        if(typeof window !== 'undefined'){
            localStorage.removeItem("token");
            setUser(null);
            setLoading(false);
        }else{
            console.log('Window is undefined');
        }

    };

    useEffect(() => {
        login();
    }, []);

    return (
        <Context.Provider
            value={{
                user,
                loading,
                login, 
                logout,
                redirectToLogin,
                setLoading,
                updateUser
            }}
        >
            {children}
        </Context.Provider>
    );
};

export default UserContext;
