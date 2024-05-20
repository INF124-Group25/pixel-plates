"use client";

import { useEffect } from "react";
import styles from "./page.module.css";
import Link from "next/link";


const ProfileDetails = ({params} : {params: {username: string}}) => {
    const name = params.username;
    const postName = "Cha For Tea - University Town Center";
    const username = params.username;
    const postImage = "/popcorn-chicken.png";


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
                    {postImages.map((image, index) => (
                        <Link
                            key={index}
                            href={`/user/${params.username}/post/OxLseuNd`}
                            className={styles.profilePostCards}
                            style={{
                                backgroundImage: `url(${image.imageSrc})`,
                                borderRadius: '0px',
                                border: "1px solid black",
                            }}
                        />
                    ))}
                </div>
            ) : (
                <h2>No Images posted yet!</h2>
            )}
        </div>
    );
};

export default ProfileDetails;

{
    /* <Image key={index} src={postImage} alt={postName} width={100} height={100}/> */
}
