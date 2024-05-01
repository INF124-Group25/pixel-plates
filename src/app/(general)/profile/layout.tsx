import type { Metadata } from "next";
import styles from "./layout.module.css";
import ProfileNav from "./ProfileNav";

export const metadata: Metadata = {
    title: "PixelPlates",
    description:
        "Social media platform for foodies to post and following favorite food content creators.",
};

export default function ProfileLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className={styles.profile}>
            <ProfileNav />
            <section className={styles.profileEditBox}>{children}</section>
        </main>
    );
}
