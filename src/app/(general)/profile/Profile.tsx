"use client"

import styles from "./page.module.css";
import { useContext, useEffect, useState } from "react";
import PostsList from "../../../components/PostsList";
import { useAuth } from '@/components/AuthContext';

const ProfilePage = () => {
    const postName = "Cha For Tea - University Town Center";
    const postImage = "/popcorn-chicken.png";

    const { loading, isAuthenticated, fetchUserProfile } = useAuth();

    
    
    const [name, setName] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            if(loading || !isAuthenticated)return;
            const user = await fetchUserProfile();
            if(user){
                setName(user.username);
            }
        };
        fetchUser();
    }, [loading, isAuthenticated, fetchUserProfile]);

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
