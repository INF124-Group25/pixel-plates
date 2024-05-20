"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import styles from "./layout.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";


const ProfileNav = () => {
    // const name = "TheLink"
    // const bio = "Follow my account for more finds in OC!";
    const imageSrc = "/default-user.png";
    // const username = params.username;


    const pathname = usePathname();
    const segments = pathname.split('/');
    const targetUsername = segments[2];

    const [bio, setBio] = useState("no bio yet");
    const [username, setUsername] = useState("");


    useEffect(()=>{
        const fetchUser = async() => {
            try {
                const options = {
                    headers: {

                    }
                }

                const response = await fetch('http://localhost:5001/api/test/user');
                console.log(response);//TESTING
                const json = await response.json();
                console.log(json);//TESTING

                const user = json.find((user: { username: string; }) => user.username === targetUsername);

                if (user) {
                    const username = user.username
                    const bio = user.bio;
                    setUsername(username);
                    setBio(bio); }
                    else {
                        console.error(`User with username ${targetUsername} not found`);
                    }
            } catch (error) {
                console.error(error);
            }    
        };
        fetchUser();
    }, [targetUsername])

    

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
                    {pathname === `/user/${username}` && (
                        <>
                        <h3>{username}</h3>
                        <p>{bio}</p>
                        </>
                    )}
                </div>
                {
                    <div className={styles.profileNavButtons}>
                        <button>Unfollow</button>
                    </div>
                }
            </div>
        </section>
    );
};

export default ProfileNav;
