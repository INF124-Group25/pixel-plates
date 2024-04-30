import styles from "./page.module.css";

export default function Login() {
    return (
        <main>
            <div className={styles.loginHeader}>
                <h1>Login Page</h1>
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
                    Don&apos;t have an account? <a href="/signup">Make one!</a>
                </div>
            </div>
        </main>
    );
}
