"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import s from '../app/(auth)/layout.module.css';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchAPI } from "../services/api";
import { LoginResponseBody } from "../../shared/types";
import publicLoader  from "../services/publicLoader";


const LoginForm = ()=> {
    const router =  useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setUsername(e.target.value);
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setPassword(e.target.value);

    const notifyUserloginSuccess = () => toast.success("Succesfully logged in!");
    const notifyUserloginFailure = () => toast.error("User login failed!");


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fetchUser = async () => {
            try {
                const data: LoginResponseBody = await fetchAPI('/auth/login', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                    }),
                });
                if (typeof window !== 'undefined'){
                    localStorage.setItem('token', data.token);
                    // console.log("Login submitted", { username, password });
                    notifyUserloginSuccess();
                    router.push('/profile');
                    setTimeout(() => {
                        router.push('/profile');
                    }, 500);
                }else{
                    console.log('Window is undefined');
                }
            } catch (error) {
                notifyUserloginFailure();
                console.error("Error when logging in:", error);
            }
        };
        fetchUser();
    };

    return (
        <form className={s.loginForm} onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                className={s.loginInput}
                value={username}
                onChange={handleUsernameChange}
            />
            <input
                type="password"
                placeholder="Password"
                className={s.loginInput}
                value={password}
                onChange={handlePasswordChange}
            />
            <button type="submit" className={s.loginButton}>
                Log In
            </button>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div className={s.signupLink}>
                <p>
                    Don&apos;t have an account? <br />{" "}
                    <Link href="/register">Make one!</Link>
                </p>
            </div>
            <div className={s.loginLogoBox}>
                <Image
                    src="/egg.png"
                    alt="egg"
                    className={s.loginLogo}
                    width={100}
                    height={100}
                    loader={publicLoader}
                />
                <p>
                    Pixel <br /> Plates
                </p>
            </div>
        </form>
    );
};

export default LoginForm;
