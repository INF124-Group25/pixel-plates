import styles from '@/styles/Header.module.css';

const Header = () => {
    return (
        <header id={styles.appHeader}>
        <div className={styles.navBrandContainer}>    
            <img src="/placeholder-612x612.jpg" alt="placeholder" width="100"/>
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
    )
}

export default Header;