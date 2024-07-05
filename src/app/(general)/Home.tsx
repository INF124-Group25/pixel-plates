"use client";

import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {

    return (
        <main className={styles.main}>
            <section className="bg-nav-yellow-gradient" style={{paddingTop: 0}}>
                <h1 className="mb-10">PixelPlates</h1>
                <div>
                    <div className="flex flex-col lg:flex-row gap-8 text-center">
                        <div className='space-y-2 my-auto'>
                            <h2 className="text-h3">Foodie platform curated with focus on content creation and food business exploration!</h2>
                            <p>Explore our page to discover other foodie&lsquo;s personal experiences and reviews. Learn and discover through their posts about diverse food businesses near you and plan your next food adventure! Don&lsquo;t forget to post about your foodie experience to develop your profile and community.</p>
                        </div>
                        <Image 
                            className="rounded-xl border border-gray-300 shadow-lg mx-auto"
                            src='/burger-ai3072x3072.jpg'
                            alt='burger'
                            width={384} 
                            height={384} 
                        />
                    </div>
                </div>
                <div className={styles.curve}></div>
            </section>
            <section className="bg-slate-400">
                <div>
                    <div className="flex flex-col lg:flex-row gap-8 text-center">
                        <Image 
                            className="rounded-xl border border-gray-300 shadow-lg mx-auto "
                            src='/chocklate-2496x4368.jpg'
                            alt='burger'
                            width={384} 
                            height={384} 
                        />
                        <div className='space-y-2 my-auto'>
                            <h2 className="text-h3">Explore or follow other foodie creators!</h2>
                            <p>Take advantage of our feed and explore feature to explore posts made by other foodies about the quality and experience of their cuisines. Explore based on filters such as the store name which provides accuruate descriptions about the name, reviews, and location of the stores. Follow users who have foodie content that align with your tastes and interests!</p>
                        </div>
                    </div>
                </div>
                <div className={styles.reversedCurve}></div>
            </section>
            <section className="bg-nav-yellow-gradient">
                <div>
                    <div className="flex flex-col lg:flex-row gap-8 text-center">
                        <div className='space-y-2 my-auto'>
                            <h2 className="text-h3">Post, Post, and Post!</h2>
                            <p>Cook up your reviews of your various foods at any food business location. You can input pictures, descriptions, and verified location of the store that you are eating at!</p>
                        </div>
                        <Image 
                            className="rounded-xl border border-gray-300 shadow-lg mx-auto"
                            src='/salad_3456x5184.jpg'
                            alt='burger'
                            width={384} 
                            height={384} 
                        />
                    </div>
                </div>
                {/* <div className={styles.curve}></div> */}
            </section>
        </main>
    );
}
