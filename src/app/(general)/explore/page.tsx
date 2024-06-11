import React from 'react'
// import dynamic from "next/dynamic";
// const ExplorePage = dynamic(() => import('@/app/(general)/explore/ExplorePage'), { ssr: false })
import ExplorePage from './ExplorePage';

const ExplorePagePage = () => {
    return <ExplorePage />;
}

export default ExplorePagePage;