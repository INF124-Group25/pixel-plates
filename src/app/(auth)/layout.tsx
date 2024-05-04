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
                        Try as guest
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
