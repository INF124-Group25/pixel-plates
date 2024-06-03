"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import styles from "./layout.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchUserProfile } from "@/services/api";

const ProfileNav = () => {

    const defaultImage = "/default-user.png";

    const [name, setName] = useState('null');
    const [description, setDescription] = useState('null');
    // const [image, setImage] = useState(defaultImage);
    const image = defaultImage;

    const pathname = usePathname();
    const isViewProfileRouter = pathname === "/profile";
    // const isUserProfilePage ==== maybe use a cookie or something with auth ?


    useEffect(()=>{
        const fetchUserInfo = async() => {
            try {
                const user = await fetchUserProfile();
                setName(user.username);
                setDescription(user.bio || '');
                // setImage(user.profile_image_URL || '');
            } catch (error) {
                console.error("Error when initializing profile layout:", error);
            }
        };
        fetchUserInfo();
    },[])


    return (
        <section className={styles.profileNav}>
            <div className={styles.profileNavFirsttwocontainer}>
                <div className={styles.profileNavInfo}>
                    <Image
                        src={image || defaultImage}
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
                        <Link href="/profile/following" >View Following</Link>
                    </div>
                )}
            </div>
            {isViewProfileRouter ? (
                <Link href="/profile/edit" className={styles.profileNavUploadButton}>
                    Edit Profile
                </Link>
            ) : (
                <Link href="/profile/create" className={styles.profileNavUploadButton}>
                    Create Post
                </Link>
            )}
        </section>
    );
};

export default ProfileNav;
