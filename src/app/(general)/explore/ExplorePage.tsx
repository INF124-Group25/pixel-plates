"use client";

import Image from "next/image";
import Link from "next/link";
import Head from 'next/head';
import styles from "./page.module.css";
import { useState, useEffect } from 'react';
import { getUserPicture, getPostPicture, fetchAPI, getPictureWithKey } from "@/services/api";
import { TBusiness, TPostResponseData } from "~shared/types";
import { useRouter } from "next/navigation";

type TBusinessWithImage = TBusiness & { imageUrl: string, postId:string };

const ExplorePage = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<TBusinessWithImage []>([]);
    const defaultImage = getUserPicture('Empty.png');
    const router = useRouter();

    const handleSearch = async () => {
        if (query.trim() === '') {
            return; // Prevent search if query is empty
        }

        try {
            // console.log(query);
            const data:TBusiness[] = await fetchAPI(`/test/search/${query}`);
            // console.log('data:', data);

            const updatedResults = await Promise.all(data.map(async (business) => {
                const {imageUrl, postId} = await fetchBusinessImages(business.id);
                // console.log("imageURL: ", imageUrl)
                return { ...business, imageUrl, postId };
            }));

            setResults(updatedResults);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };


    const fetchBusinessImages = async (businessId:string) => {
        try {
            const postData:TPostResponseData[] = await fetchAPI(`/test/business_post/${businessId}`); //business details
            if (postData.length > 0 && postData[0].post_url) {
                const imageSrc = getPictureWithKey(postData[0].post_url);
                const postId = postData[0].id;
                return  {imageUrl: imageSrc, postId:postId};
            }
        } catch (error) {
            console.error("Error fetching business images:", error);
        }
        return {imageUrl:defaultImage, postId: ''};
    };

    const navigateToRouter = (postId:string) => {
        router.push(`/user/erick/post/${postId}`);
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
                                <Image src={result.imageUrl} alt={result.business_name} width={140} height={100} onClick={() => navigateToRouter(result.postId)}/>
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
