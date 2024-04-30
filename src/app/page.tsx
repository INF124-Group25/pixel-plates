import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
    return (
        <main className={styles.main}>
            <h1 className={styles.mainHeading}>PixelPlates</h1>
            <img src="/placeholder-612x612.jpg" className={styles.mainImage} alt="" />
        </main>
    );
}
