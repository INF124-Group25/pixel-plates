import styles from "./Header.module.css";
import Image from "next/image";

const Header = () => {
    return (
        <header id={styles.appHeader}>
            <div className={styles.navBrandContainer}>
                <Image
                    src="/placeholder-612x612.jpg"
                    alt="placeholder"
                    width={150}
                    height={100}
                />
                <h3> PixelPlates</h3>
            </div>

            <nav className={styles.navContainer}>
                <a href="/">Home</a>
                <a href="/explore">Explore</a>
                <a href="/upload">Upload</a>
                <a href="/profile">Profile</a>
                <a href="/settings">Settings</a>
                <a href="/login">Login</a>
            </nav>
        </header>
    );
};

export default Header;
