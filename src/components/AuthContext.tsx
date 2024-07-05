"use client";
import { fetchAPI } from "../services/api";
import { Context, ReactNode, createContext, useContext, useState, Dispatch, SetStateAction, useEffect} from "react";
import { UserAuthenticatedResponse, UserDataResponse } from "../../shared/types";
import { useRouter } from "next/navigation";

type AuthContextType = {
    isAuthenticated: boolean;
    loading: boolean;
    login: () => Promise<void>, 
    logout: () => Promise<void>,
    fetchUserProfile: () => Promise<UserDataResponse | null>,
    setLoading: Dispatch<SetStateAction<boolean>>,
};

type AuthContextPropsType = {
    children: ReactNode;
};

const AuthContext: Context<AuthContextType | null> = createContext<AuthContextType | null>(null);


export const AuthProvider = ({ children }: AuthContextPropsType) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const login = async () => {
        setLoading(true);
        try {
            const userData = await fetchAPI("/auth/login", true, { method: "POST" });
            // console.log('userData:', userData); // TESTING
            setIsAuthenticated(true);
            setTimeout(()=> router.push('/'), 500);
        } catch (error) {
            // router.push("/login");
            console.error("Token is invalid!:", error);
        } finally {
            setLoading(false);
        }
    };
    const logout = async() => {
        try {
            const response = await fetchAPI("/auth/logout", true, { method: "POST" });
            console.log("logged out successfully:", response);
            setIsAuthenticated(false);
            setLoading(false);
            router.push('/login');
            console.log(response);
        } catch (error) {
            console.error("Failed to logout:", error);
        }
    };

    const fetchUserProfile = async () => {
        if(!isAuthenticated){
            console.error("User is not authenticated");
            return null;
        };
        try {
            const userData:UserDataResponse = await fetchAPI("/user/profile", true);
            // console.log('userData:', userData); // TESTING
            return userData;
        } catch (error) {
            console.error("Failed to fetch user profile:", error);
            // redirect to login perhaps
            router.push('/login');
            return null;
        }
    };

    const checkAuthStatus = async () => {
        try {
            const response:UserAuthenticatedResponse = await fetchAPI("/auth/check-auth", true);
            setIsAuthenticated(response.isAuthenticated);
        } catch (error) {
            console.error("Failed to check auth status:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(window){
            checkAuthStatus();
        }
    }, []);


    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                loading,    
                login, 
                logout,
                fetchUserProfile,
                setLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider, make sure to render AuthProvider at top of applicaiton!");
    }
    return context;
};
