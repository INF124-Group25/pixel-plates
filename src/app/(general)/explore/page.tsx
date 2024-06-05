"use client";

import Image from "next/image";
import Link from "next/link";
import Head from 'next/head';
import styles from "./page.module.css";
import { useState } from 'react';

const ExplorePage = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        if (query.trim() === '') {
            return; // Prevent search if query is empty
        }

        try {
            console.log(query);
            const response = await fetch(`http://localhost:5001/api/test/search/${query}`);
            const data = await response.json();
            console.log(data, "data");
            setResults(data);
            console.log(results);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
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
                        {Array.from({ length: 4 }).map((_, imgIndex) => (
                            <div key={imgIndex} className={styles.imagePlaceholder}></div> // Image placeholders
                        ))}
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
