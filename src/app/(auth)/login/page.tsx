import Link from "next/link";
import styles from "../layout.module.css";
import Image from "next/image";

export default function Login() {
    return (
        <>
                <div className={styles.loginHeader}>
                    <h2>Sign In</h2>
                </div>
                <div className={styles.loginForm}>
                    <input type="text" placeholder="Username" className={styles.loginInput} />
                    <input
                        type="password"
                        placeholder="Password"
                        className={styles.loginInput}
                    />
                    <button className={styles.loginButton}>Log In</button>
                    <div className={styles.signupLink}>
                        <p>Don&apos;t have an account? <br /> <Link href="/register">Make one!</Link></p>
                    </div>
                    <div className={styles.loginLogoBox}>
                        <Image src="/egg.png" alt="egg" className={styles.loginLogo} width={100} height={100}/>
                        <p >Pixel <br /> Plates</p>
                    </div>
                </div>
        </>
    );
}
