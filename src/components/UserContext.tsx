"use client";
import { fetchAPI, fetchUserProfile } from "@/services/api";
import { createContext, useEffect, useState } from "react";
import { RequestUserProfile } from "~shared/types";
import { useRouter } from "next/navigation";
export type UserContextType = {
    user: RequestUserProfile | null;
    loading: boolean;
    login: () => Promise<void>, 
    logout: () => void,
    redirectToLogin: () => void,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
};

export const Context = createContext<UserContextType | null>(null);

const UserContext = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<RequestUserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const redirectToLogin = () => router.push('/login');

    const login = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }
        try {
            const userData = await fetchUserProfile();
            console.log('userData:', userData); // TESTING
            setUser(userData);
        } catch (error) {
            localStorage.removeItem("token");
            // router.push("/login");
            console.error("Token is invalid!:", error);
        } finally {
            setLoading(false);
        }
    };
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setLoading(false);
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
                setLoading
            }}
        >
            {children}
        </Context.Provider>
    );
};

export default UserContext;
