import styles from "../layout.module.css";
import LoginForm from "@/components/LoginForm";

export default function Login() {

    return (
        <>
            <div className={styles.loginHeader}>
                <h2>Sign In</h2>
            </div>
            <LoginForm />
            
        </>
    );
}
