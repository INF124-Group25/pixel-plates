"use client";

import styles from "./page.module.css";
import FollowerCard from "../profile/following/Card";
import PostCard from "./FeedPost";
import { useEffect, useState } from "react";
import { fetchAPI } from "@/services/api";

interface User {
    id: string;
    name: string;
    bio: string;
    profile_image_URL:string;
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
    const [feed, setFeed] = useState<Feed[]>([]);
    const [user, setUser] = useState<User[]>([]); 
    const [business, setBusiness ] = useState<Business[]>([]);
    
    useEffect(()=>{
        const fetchFeedandUser = async () => {
            try {
                const feedData:Feed[] = await fetchAPI('/test/feed');
                    // console.log("feedData: ", feedData);
                    const usersData:User[] = await Promise.all(feedData.map((post:any) => fetchAPI(`/test/user/${post.user_id}`)));
                    // console.log("usersData: ", usersData);
                    const businessesData:Business[] = await Promise.all(feedData.map((post:any) => fetchAPI(`/test/${post.business_id}`)));
                    // console.log("businessesData: ", businessesData);
                    
                     // these must be clustered together because we cannot update component during setState when we have an API call after
                    setFeed(feedData); 
                    setUser(usersData.flat());
                    setBusiness(businessesData.flat());
                
                
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
                                <FollowerCard src={user[index].profile_image_URL} name={user[index].username} bio={user[index].bio} />
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
