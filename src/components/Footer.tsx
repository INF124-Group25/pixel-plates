import styles from '@/styles/Footer.module.css';

const Footer = () => {
    return (
        <footer id={styles.appFooter}>
            <hr className={styles.customHr} />
            <h3>PixelPlates</h3>
            <p>Copyright @ 2024 PixelPlates Team</p>
        </footer>
    )
}

export default Footer;