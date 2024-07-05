import HeaderLinks from "../../components/HeaderLinks";
import styles from "./Header.module.css";
import Image from "next/image";
import Link from "next/link";
import eggPicture from '../../../public/egg.png';
const Header = () => {


    return (
        <header id={styles.appHeader}>
            <Link href="/">
            <div className={styles.navBrandContainer}>
                    <Image
                        src={eggPicture}
                        alt="placeholder"
                        // loader={publicLoader}
                    />
                <h3 style={{color:'white'}}> PixelPlates</h3>
            </div>
            </Link>
            <HeaderLinks />
        </header>
    );
};

export default Header;
