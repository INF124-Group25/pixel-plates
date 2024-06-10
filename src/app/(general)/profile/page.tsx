"use client"

import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { fetchUserProfile, getUserPicture, getPictureWithKey } from "@/services/api";
import PostsList from "@/components/PostsList";
import { Context } from '@/components/UserContext';

const ProfilePage = () => {
    const postName = "Cha For Tea - University Town Center";
    const postId = "OxLseuNd";
    const postImage = "/popcorn-chicken.png";

    const userContext = useContext(Context);
    if(!userContext){
        throw new Error('context should be loaded within a context provider');
    }
    const {
        user,
    } = userContext;

    
    
    const [name, setName] = useState('');

    useEffect(() => {
        if (user) {
            setName(user.username);
        }
    }, [user]);

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
