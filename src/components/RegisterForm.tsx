'use client'
import Link from "next/link";
import s from "../app/(auth)/layout.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { fetchAPI } from '../services/api'
import { UserDataResponse } from "../../shared/types";
import CloudFrontLoader from "@/services/CloudFrontLoader";


const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();
    const handleUsernameChange = (e:React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
    const handleEmailChange = (e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePasswordChange = (e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e:React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value);
    const notifyUserRegisterSuccess = () => toast.success("Succesfully registered!");
    const notifyUserRegisterFailure = () => toast.error("User register failed!");
    const notifyGoogleSignInNotImplemented = () => toast.info("Google auth not implented yet");
    const notifyPasswordsNotMatching = () => toast.error("Make sure to match passwords");
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(password !== confirmPassword){
            notifyPasswordsNotMatching();
            return;
        }
        const fetchUser = async () => {
            try {
                const response: UserDataResponse = await fetchAPI('/auth/register', true, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, email, password }),
                });
                notifyUserRegisterSuccess();
                router.push('/profile');
            } catch (error) {
                notifyUserRegisterFailure();
                console.error("Error when registering in:", error);
            }
        };
        fetchUser();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={s.loginHeader}>
                <h2>Sign Up</h2>
            </div>
            <div className={s.loginForm}>
                <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Username"
                    className={s.loginInput}
                    value={username}
                    onChange={handleUsernameChange}
                />
                <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className={s.loginInput}
                    value={email}
                    onChange={handleEmailChange}
                />
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    className={s.loginInput}
                    value={password}
                    onChange={handlePasswordChange}
                />
                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    className={s.loginInput}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                />
                <button type="submit" className={s.loginButton}>
                    Sign Up
                </button>
                <button type="button" onClick={notifyGoogleSignInNotImplemented}>
                    Signup with Google
                </button>
                <div className={s.signupLink}>
                    <p>
                        Have an account? <br />{" "}
                        <Link href="/login">Login Here!</Link>
                    </p>
                </div>
                <div className={s.loginLogoBox}>
                    <Image
                        src="/egg.png"
                        alt="egg"
                        className={s.loginLogo}
                        width={100}
                        height={100}
                        loader={CloudFrontLoader}
                    />
                    <p>
                        Pixel <br /> Plates
                    </p>
                </div>
            </div>
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
        </form>
    );
};

export default RegisterForm;
