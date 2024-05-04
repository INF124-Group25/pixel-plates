import Link from "next/link";
import styles from "../layout.module.css";
import Image from "next/image";

export default function Register() {
    return (
        <>
                <div className={styles.loginHeader}>
                    <h2>Sign Up</h2>
                </div>
                <div className={styles.loginForm}>
                    <input type="text" placeholder="Username" className={styles.loginInput} />
                    <input
                        type="password"
                        placeholder="Password"
                        className={styles.loginInput}
                    />
                    <input type="text" placeholder="Confirm Username" className={styles.loginInput} />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className={styles.loginInput}
                    />
                    <button className={styles.loginButton}>Sign Up</button>
                    <div className={styles.signupLink}>
                        <p>Have an account? <br /> <Link href="/login">Login Here!</Link></p>
                    </div>
                    <div className={styles.loginLogoBox}>
                        <Image src="/egg.png" alt="egg" className={styles.loginLogo} width={100} height={100}/>
                        <p >Pixel <br /> Plates</p>
                    </div>
                </div>
        </>
    );
}
