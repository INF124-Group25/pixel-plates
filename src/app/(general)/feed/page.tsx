"use client";

import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import FollowerCard from "../profile/following/Card";
import PostCard from "./FeedPost";
import { useEffect, useState } from "react";


interface User {
    id: string;
    name: string;
    bio: string;
    src: string;
    username: string;
}

interface Feed {
    user_id: string;
    business_id: string;
    review: string;
    id: string;
}

interface Business {
    business_name: string;
    address: string;
    phone_number: string;
    star_rating: number;
    review_count: number;
}

const FeedPage = () => {
    const name = "Feed";
    // const postName = "Cha For Tea - University Town Center";
    // const postId = "OxLseuNd";
    // const postImage = "/popcorn-chicken.png";


    // includes multiple objects
    const [feed, setFeed] = useState<Feed[]>([]);
    const [user, setUser] = useState<User[]>([]); 
    const [business, setBusiness ] = useState<Business[]>([]);
    
    useEffect(()=>{
        const fetchFeedandUser = async () => {
            try {
                const feedResponse = await fetch('http://localhost:5001/api/test/feed');
                
                if(feedResponse.ok){
                    const feedData = await feedResponse.json();
                    console.log("feedData: ", feedData);

                    const userPromises = feedData.map((post: any) => 
                        fetch(`http://localhost:5001/api/test/user/${post.user_id}`)
                    );
                    
                    const userResponses = await Promise.all(userPromises);
                    const usersData = await Promise.all(userResponses.map(async (res) => await res.json()));
                    console.log("usersData: ", usersData);

                    const businessPromises = feedData.map((post: any) => 
                        fetch(`http://localhost:5001/api/test/${post.business_id}`)
                    );
                    const businessResponses = await Promise.all(businessPromises);
                    const businessesData = await Promise.all(businessResponses.map(async (res) => await res.json()));
                    console.log("businessesData: ", businessesData);

                    
                     // these must be clustered together because we cannot update component during setState when we have an API call after
                    setFeed(feedData); 
                    setUser(usersData.flat());
                    setBusiness(businessesData.flat());
                }
                
                
            }
        catch (error) {
            console.log(error);
        }

        }

        fetchFeedandUser();
    }, [])


    return (
        <div className={styles.profile}>
            <h1>{name}</h1>
            {user ? (
                <div className={styles.followingPage}>
                    <div className={styles.cardGrid}>
                        {feed.map((posts, index) => (
                            <div key={`${index}-${user[index].name}`} className={styles.cardRow}>
                                <FollowerCard src={user[index].src} name={user[index].username} bio={user[index].bio} />
                                <PostCard
                                    // imageSrc={posts[index].imageSrc}
                                    // imageName={posts[index].name}
                                    name={business[index].business_name}
                                    address={business[index].address}
                                    number={business[index].phone_number}
                                    stars={business[index].star_rating}
                                    review_count={business[index].review_count}
                                    review={posts.review}
                                    postID={posts.id}
                                />
                            </div>
                        ))}
                        
                    </div>
                </div>
            ) : (
                <h2>No Followers or Posts 🥺</h2>
            )}
        </div>
    );
};

export default FeedPage;

{
    /* <Image key={index} src={postImage} alt={postName} width={100} height={100}/> */
}
