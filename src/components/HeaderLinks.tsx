'use client';

import Link from "next/link";
import s from "../app/(general)/Header.module.css";
import { useAuth } from "@/components/AuthContext";
import { useEffect } from "react";

const HeaderLinks = () => {
    const { isAuthenticated, logout } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            console.log("User is authenticated");
        }else{
            console.log("User is not authenticated");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    return (
        <nav className={s.navContainer}>
            {isAuthenticated ? (
                <>
                    <Link href="/explore">Explore</Link>
                    <Link href="/profile/create">Create</Link>
                    <Link href="/profile">Profile</Link>
                    <Link href="/feed">Feed</Link>
                    {/* <Link href="/login">Logout</Link> */}
                    <button className={s.logoutButton} onClick={() => logout()}>Logout</button>
                </>
            ) : (
                <>
                    <Link href="/explore">Explore</Link>
                    <Link href="/login">Login</Link>
                </>
            )}
        </nav>
    );
};

export default HeaderLinks;
