import styles from "../layout.module.css";
import dynamic from "next/dynamic";
const LoginForm = dynamic(() => import('@/components/LoginForm'), { ssr: false })

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
