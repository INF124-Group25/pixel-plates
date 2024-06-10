import Link from "next/link";
import "../globals.css";
import styles from "./layout.module.css";

export const metadata = {
    title: "Login",
    description: "Login page for PixelPlates",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <main className={styles.main}>
                    <div className={styles.loginBox}>{children}</div>
                    <button className={styles.registerButton}>
                        <Link href="/explore" style={{color:'black'}}>Try as guest</Link>
                    </button>
                </main>
            </body>
        </html>
    );
};

{
    /* <html lang="en">
<body>{children}</body>
</html> */
}
