"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { fetchAPI } from "../../services/api";

export default function Home() {
    const [username, setUsername] = useState("no name yet");


    useEffect(()=>{
        const fetchUser = async() => {
            try {
                const json = await fetchAPI('/test/user');
                // console.log(json);//TESTING
                const username = json[0].username;
                setUsername(username);
            } catch (error) {
                console.error(error);
            }
            
        };
        fetchUser();
    }, [])


    return (
        <main className={styles.main}>
            <h1 className={styles.mainHeading}>PixelPlates</h1>
            <img src="/placeholder-612x612.jpg" className={styles.mainImage} alt="" />
            <p>{username}</p>
        </main>
    );
}
