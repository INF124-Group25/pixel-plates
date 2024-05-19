"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import styles from "./layout.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";


const ProfileNav = () => {
    const name = "JonnieEats"
    const bio = "Follow my account for more finds in OC!";
    const imageSrc = "/default-user.png";
    // const username = params.username;


    const pathname = usePathname();

    // const [bio, setBio] = useState("no bio yet");


    // useEffect(()=>{
    //     const fetchUser = async() => {
    //         try {
    //             const options = {
    //                 headers: {

    //                 }
    //             }
    //             const response = await fetch('http://localhost:5000/api/test/user');
    //             console.log(response);//TESTING
    //             const json = await response.json();
    //             console.log(json);//TESTING
    //             const bio = json[0].bio;
    //             setBio(name);
    //         } catch (error) {
    //             console.error(error);
    //         }
            
    //     };
    //     fetchUser();
    // }, [])

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
                    {pathname === `/user/${name}` && (
                        <>
                        <h3>{name}</h3>
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
