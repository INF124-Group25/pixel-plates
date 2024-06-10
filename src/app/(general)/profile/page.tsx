"use client"

import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { fetchUserProfile, getUserPicture, getPictureWithKey } from "@/services/api";
import { Context, UserContextType } from '@/components/UserContext';
import PostsList from "@/components/PostsList";

const ProfilePage = () => {
    const postName = "Cha For Tea - University Town Center";
    const postId = "OxLseuNd";
    const postImage = "/popcorn-chicken.png";

    const userContext = useContext(Context);
    if(!userContext){
        throw new Error('context should be loaded within a context provider');
    }
    const {user, loading, userToken, setUser, setUserToken, isUserAuthenticated, setupLocalUser} = userContext;

    
    
    const [name, setName] = useState('null');

    useEffect(()=>{
        const fetchUserInfo = async() => {
            try {
                const user = await fetchUserProfile();
                setName(user.username);
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
    },[user, userToken]);

    type posts = {
        name: string;
        imageSrc: string;
    };
    const postImages: posts[] = new Array(24).fill({
        name: postName,
        imageSrc: postImage,
    });
    

    return (
        <div className={styles.profile}>
            <h1>{name}</h1>
            {postImages && postImages.length > 0 ? (
                <div className={styles.profilePosts}>
                    <PostsList />
                </div>
            ) : (
                <h2>No Images posted yet!</h2>
            )}
        </div>
    );
};

export default ProfilePage;

{
    /* <Image key={index} src={postImage} alt={postName} width={100} height={100}/> */
}
