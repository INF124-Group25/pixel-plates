import Link from "next/link";
import styles from "../layout.module.css";
import Image from "next/image";
import { signIn, auth } from "@/auth";
import Page from "@/app/server/page";
import { redirect } from "next/navigation";


type TRegisterFormData = {
    username: string,
    password: string,
    confirmUsername:string
    confirmPassword:string
};

export default function Register() {
    // const register = async(formData:TRegisterFormData) => {
    //     "use server";
    //     await login(formData);
    //     redirect("/");
    // };
    const registerGoogle = async () => {
        "use server";
        await signIn("google", { redirectTo: "/" });
        await logSession();
    };
    const logSession = async () => {
        "use server";
        const session = await auth();
        if (!session || !session.user) return null;
        console.log(session.user); // TESTING
    };

    return (
        <div>
            <form
                action={logSession}
            >
                <div className={styles.loginHeader}>
                    <h2>Sign Up</h2>
                </div>
                <div className={styles.loginForm}>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Username"
                        className={styles.loginInput}
                    />
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        className={styles.loginInput}
                    />
                    <input
                        type="text"
                        id="confirmUsername"
                        name="confirmUsername"
                        placeholder="Confirm Username"
                        className={styles.loginInput}
                    />
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        className={styles.loginInput}
                    />
                    <button type="submit" className={styles.loginButton}>
                        Sign Up
                    </button>
                    <button type="submit" formAction={registerGoogle}>Signup with Google</button>
                    <div className={styles.signupLink}>
                        <p>
                            Have an account? <br />{" "}
                            <Link href="/login">Login Here!</Link>
                        </p>
                    </div>
                    <div className={styles.loginLogoBox}>
                        <Image
                            src="/egg.png"
                            alt="egg"
                            className={styles.loginLogo}
                            width={100}
                            height={100}
                        />
                        <p>
                            Pixel <br /> Plates
                        </p>
                    </div>
                </div>
            </form>
            <Page />
        </div>
    );
}
