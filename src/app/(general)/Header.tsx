import HeaderLinks from "@/components/HeaderLinks";
import styles from "./Header.module.css";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
    return (
        <header id={styles.appHeader}>
            <Link href="/">
            <div className={styles.navBrandContainer}>
                    <Image
                        src="/egg.png"
                        alt="placeholder"
                        width={100}
                        height={100}
                    />
                <h3 style={{color:'white'}}> PixelPlates</h3>
            </div>
            </Link>
            <HeaderLinks />
        </header>
    );
};

export default Header;
