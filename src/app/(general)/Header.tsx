import styles from "./Header.module.css";
import Image from "next/image";

const Header = () => {
    return (
        <header id={styles.appHeader}>
            <div className={styles.navBrandContainer}>
                <Image
                    src="/egg.png"
                    alt="placeholder"
                    width={100}
                    height={100}
                />
                <h3> PixelPlates</h3>
            </div>

            <nav className={styles.navContainer}>
                {/* <a href="/">Home</a> */}
                <a href="/explore">Explore</a>
                {/* <a href="/profile/create">Create</a> -- removed because creating should be in profile nav*/}
                <a href="/profile">Profile</a>
                <a href="/feed">Feed</a>
                <a href="/login">Login</a>
                
            </nav>
        </header>
    );
};

export default Header;
