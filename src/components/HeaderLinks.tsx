'use client';

import Link from "next/link";
import { useContext } from "react";
import s from "@/app/(general)/Header.module.css";
import { Context } from "@/components/UserContext";
import { useRouter } from "next/navigation";

const HeaderLinks = () => {
    const userContext = useContext(Context);
    if (!userContext) {
        throw new Error("context should be loaded within a context provider");
    }
    const { user, logout } = userContext;
    const router = useRouter();
    const logoutUser = () => {
        logout();
        router.push("/");
    };

    return (
        <nav className={s.navContainer}>
            {user ? (
                <>
                    <Link href="/explore">Explore</Link>
                    <Link href="/profile/create">Create</Link>
                    <Link href="/profile">Profile</Link>
                    <Link href="/feed">Feed</Link>
                    {/* <Link href="/login">Logout</Link> */}
                    <button className={s.logoutButton} onClick={logoutUser}>Logout</button>
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
