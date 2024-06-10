"use client";

import Image from "next/image";
import Link from "next/link";
import Head from 'next/head';
import styles from "./page.module.css";
import { useState, useEffect } from 'react';
import { getUserPicture, getPostPicture } from "@/services/api";

const ExplorePage = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const defaultImage = getUserPicture('Empty.png');

    const handleSearch = async () => {
        if (query.trim() === '') {
            return; // Prevent search if query is empty
        }

        try {
            console.log(query);
            const response = await fetch(`http://localhost:5001/api/test/search/${query}`);
            const data = await response.json();

            const updatedResults = await Promise.all(data.map(async (business) => {
                const imageUrl = await fetchBusinessImages(business.id);
                console.log("imageURL: ", imageUrl)
                return { ...business, imageUrl };
            }));

            setResults(updatedResults);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    const fetchBusinessImages = async (businessId) => {
        try {
            const response = await fetch(`http://localhost:5001/api/test/business_post/${businessId}`); //business details
            console.log("business id  here", businessId);
            const posts = await response.json(); //should be posts?
            console.log("posts" , posts);
            if (posts.length > 0) {
              // console.log("Im going to hhhahaah",posts[0].id)
                return getPostPicture(posts[0].post_url); // Assuming each post has an 'imageURL' property
            }
        } catch (error) {
            console.error("Error fetching business images:", error);
        }
        return defaultImage;
    };

    return (
        <div className={styles.container}>
          <Head>
            <title>Business Search</title>
          </Head>
    
          <header>
            <div className={styles.search}>
              <input
                type="text"
                placeholder="Search for business ..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className={styles.searchBtn} onClick={handleSearch}>🔍</button>
            </div>
          </header>
    
          <main className={styles.cardContainer}>
            {results.length > 0 ? (
                results.map((result, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.imageContainer}>
                            {result.imageUrl ? (
                                <Image src={result.imageUrl} alt={result.business_name} width={140} height={100} />
                            ) : (
                                <div className={styles.imagePlaceholder}></div> // Placeholder if no image found
                            )}
                        </div>
                        <h2>{result.business_name}</h2>
                        <p>{result.address}</p>
                        <p>{result.phone_number}</p>
                        <p>{result.star_rating} Stars ({result.review_count} Reviews)</p>
                        <button className={styles.directionBtn}>Directions</button>
                    </div>
                ))
            ) : (
                <p></p>
            )}
          </main>
        </div>
    );
};

export default ExplorePage;
