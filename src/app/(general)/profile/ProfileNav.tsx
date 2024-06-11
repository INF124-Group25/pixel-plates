"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import styles from "./layout.module.css";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { getUserPicture, getPictureWithKey } from "../../../services/api";
import { Context } from '../../../components/UserContext';
import { TrophySpin } from "react-loading-indicators";


const ProfileNav = () => {
    const userContext = useContext(Context);
    if(!userContext){
        throw new Error('context should be loaded within a context provider');
    }

    const {user, loading, login, setLoading, redirectToLogin} = userContext;

    const [name, setName] = useState('null');
    const [description, setDescription] = useState('null');
    const defaultImage = getUserPicture('default-user.png');
    const [image, setImage] = useState(defaultImage);

    const pathname = usePathname();
    const isViewProfileRouter = pathname === "/profile";
    // const isUserProfilePage ==== maybe use a cookie or something with auth ?

    
    useEffect(()=>{
        const fetchData = async () => {
            if(loading)return;
            if(user) {
                setName(user.username);
                setDescription(user.bio || '');
                console.log('profile layout pic: ' + getPictureWithKey(user.profile_image_URL!));//TESTING
                setImage(user.profile_image_URL ? getPictureWithKey(user.profile_image_URL) : defaultImage);
            }else{
                redirectToLogin();
                console.log('user is null');// TESTING
            }
        };
        fetchData();
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
