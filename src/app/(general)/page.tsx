"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {
    const [username, setUsername] = useState("no name yet");


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
