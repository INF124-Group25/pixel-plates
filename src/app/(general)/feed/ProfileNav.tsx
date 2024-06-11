"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import styles from "./layout.module.css";
import Link from "next/link";
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../../components/UserContext';
import { TrophySpin } from "react-loading-indicators";
import { getPictureWithKey } from "../../../services/api";

const ProfileNav = () => {
    const [name, setName] = useState('JonnieEats');
    const [description, setDescription] = useState('Follow my account for more finds in OC!');
    const defaultImage = "/default-user.png";
    const [imageSrc, setImageSrc] = useState(defaultImage);
    const pathname = usePathname();
    const isViewProfileRouter = pathname === "/profile";
    // const isUserProfilePage ==== maybe use a cookie or something with auth ?
    const userContext = useContext(Context);
    if(!userContext){
        throw new Error('context should be loaded within a context provider');
    }
    const { user, loading, redirectToLogin } = userContext;
    useEffect(()=>{
        if(loading) return;
        if(user) {
            setName(user.username);
            setDescription(user.bio || '');
            // if(user.profile_image_URL){
            //     console.log('profile layout pic' + getPictureWithKey(user.profile_image_URL));
            // }
            setImageSrc(user.profile_image_URL ? getPictureWithKey(user.profile_image_URL) : defaultImage);
        }else{
            redirectToLogin();
        }
    },[user]);

    if(loading){
        return (
            <section className={styles.profileNav}>
                <TrophySpin color="#cfcb58" size="medium" text="yum" textColor="" />
            </section>
        );
    }

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
