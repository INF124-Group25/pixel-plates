"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import styles from "./layout.module.css";
import Link from "next/link";

const ProfileNav = () => {
    const name = "JonnieEats";
    const description = "Follow my account for more finds in OC!";
    const imageSrc = "/default-user.png";
    const password = "password";

    const pathname = usePathname();
    const isViewProfileRouter = pathname === "/profile";
    // const isUserProfilePage ==== maybe use a cookie or something with auth ?

    return (
        <section className={styles.profileNav}>
            <div className={styles.profileNavFirsttwocontainer}>
                <div className={styles.profileNavInfo}>
                    <Image
                        src={imageSrc}
                        alt="default user"
                        width={125}
                        height={125}
                    />
                    <h3>{name}</h3>
                    <p>{description}</p>
                </div>
                {!isViewProfileRouter && (
                    <div className={styles.profileNavButtons}>
                        <Link href="/profile/edit" >Edit Profile</Link>
                        <Link href="/profile" >View Profile</Link>
                        <Link href="/profile/followers" >View Following</Link>
                    </div>
                )}
            </div>
            {isViewProfileRouter ? (
                <Link href="/profile/edit" className={styles.profileNavUploadButton}>
                    Edit Profile
                </Link>
            ) : (
                <Link href="/upload" className={styles.profileNavUploadButton}>
                    Upload Post
                </Link>
            )}
        </section>
    );
};

export default ProfileNav;
