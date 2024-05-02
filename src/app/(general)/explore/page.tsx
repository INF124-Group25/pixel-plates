import Image from "next/image";
import Link from "next/link";
import Head from 'next/head';
import styles from "./page.module.css";

const ExplorePage = () => {
    
    return (
        <div className={styles.container}>
          <Head>
            <title>Business Search</title>
          </Head>
    
          <header>
            {/* <div className="topNav">
              <button>MyProfile</button>
              <button>Explore</button>
              <button>Logout</button>
            </div> */}
            <div className={styles.search}>
              <input type="text" placeholder="Search for business ..." />
              <button className={styles.searchBtn}>🔍</button>
            </div>
          </header>
    
          <main className={styles.cardContainer}>
        {Array.from({ length: 6 }).map((_, index) => ( // Adjust the number based on your actual data
          <div key={index} className={styles.card}>
            {Array.from({ length: 4 }).map((_, imgIndex) => (
                <div key={imgIndex} className={styles.imagePlaceholder}></div> // Image placeholders
            ))}            <h2>Cha For Tea - University Town Center</h2>
            <p>4187 Campus Dr Ste M173</p>
            <p>Irvine, CA 92612</p>
            <p>(949) 725-0300</p>
            <p>3.8 Stars (1009 Reviews)</p>
            <button className={styles.directionBtn}>Directions</button>
          </div>
        ))}
      </main>
        </div>
      );
};

export default ExplorePage;

{
    /* <Image key={index} src={postImage} alt={postName} width={100} height={100}/> */
}
