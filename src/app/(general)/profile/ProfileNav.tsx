"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import styles from "./layout.module.css";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { fetchUserProfile, getUserPicture, getPictureWithKey } from "@/services/api";
import { Context, UserContextType } from '@/components/UserContext';


const ProfileNav = () => {
    const userContext = useContext(Context);
    if(!userContext){
        throw new Error('context should be loaded within a context provider');
    }
    const {user, loading, userToken, setUser, setUserToken, isUserAuthenticated, setupLocalUser} = userContext;

    
    
    const [name, setName] = useState('null');
    const [description, setDescription] = useState('null');
    const defaultImage = getUserPicture('default-user.png');
    const [image, setImage] = useState(defaultImage);

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
                setImage(user.profile_image_URL ? getPictureWithKey(user.profile_image_URL) : defaultImage);
            } catch (error) {
                console.error("Error when initializing profile layout:", error);
            }
        };
        fetchUserInfo();
        setupLocalUser();
    },[]);

    useEffect(()=>{
        if(!user) return;
        setName(user.username);
        setDescription(user.bio || '');
    },[user, userToken]);


    return (
        <section className={styles.profileNav}>
            <div className={styles.profileNavFirsttwocontainer}>
                <div className={styles.profileNavInfo}>
                    <Image
                        src={image}
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
