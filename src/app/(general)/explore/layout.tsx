import type { Metadata } from "next";
import styles from "./layout.module.css";

export const metadata: Metadata = {
    title: "PixelPlates",
    description:
        "Social media platform for foodies to post and following favorite food content creators.",
};

export default function ExploreLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className={styles.explore}>
            <section className={styles.exploreBox}>{children}</section>
        </main>
    );
}
