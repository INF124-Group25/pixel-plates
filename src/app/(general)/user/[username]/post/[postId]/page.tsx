"use client"
import styles from "./page.module.css";
import Image from "next/image";
import { useEffect, useState } from 'react';
import { fetchAPI, getPictureWithKey } from "../../../../../../services/api";


export type PostParams = {
    postId: string;
};


// const PostDetails = ({params} : {params: {postId: string}}) => {
const PostDetails = ({params} : {params: PostParams}) => {
    // const { postId } = useParams<{ postId: string }>()
    const postId = params.postId;
    const postImage = "/popcorn-chicken.png";

    const [review, setReview] = useState<string>();
    const [restaurantName, setRestaurantName] = useState<string>();
    const [restaurantAddress, setRestaurantAddress] = useState<string>();
    const [restaurantNumber, setRestaurantNumber ] = useState<string>();
    const [restaurantRating, setRestaurantRating] = useState<string>();
    const [imageSrc, setImageSrc] = useState(postImage);


    useEffect(() => {
        fetchPostDetails(postId);
    }, [postId]);
    

    const fetchPostDetails = async (post_id: string) => {
        try {
            const postDetails = await fetchAPI(`/post/${post_id}`)
            const businessDetails = await fetchAPI(`/test/${postDetails[0].business_id}`)
            // console.log(businessDetails);

            setImageSrc(getPictureWithKey(postDetails[0].post_url ));
            setReview(postDetails[0].review);
            setRestaurantAddress(businessDetails[0].address)
            setRestaurantName(businessDetails[0].business_name)
            setRestaurantNumber(businessDetails[0].phone_number)
            setRestaurantRating(businessDetails[0].star_rating)
            
        } catch (error) {
            console.log(error)
        }
    }
    

    return (
            <div className={styles.postBox}>
                <h2>{restaurantName}</h2>
             <div className={styles.postHeader}>
                <div>
                    <h6>{restaurantAddress}</h6>
                    <h6>{restaurantNumber}</h6>
                    <h6>{restaurantRating}</h6>
                </div>
                <div className={styles.direction}>
                    <button>Directions</button>
                </div>
              </div>
              <div className={styles.postBoxForm}>
              <div style={{ borderBottom: '1px solid black' }}></div>
                <div className={styles.postBoxFormFirstContainer}>
                    <div className={styles.postPictures}>
                    <Image
                        src={imageSrc}
                        alt="default user"
                        width={125}
                        height={125}
                    />
                    </div>
                  <div style={{ borderBottom: '1px solid black' }}></div>
                 
                    <label htmlFor="review">Review</label>
                    <div style={{ 
                        width: '100%', 
                        border: '1px solid #ccc', 
                        borderRadius: '4px', 
                        padding: '6px 12px', 
                        fontSize: '14px', 
                        overflowY: 'auto', 
                        height: 'auto', 
                        minHeight: '100px', 
                        whiteSpace: 'pre-wrap' 
                    }}>
                        {review}
                    </div>                
                </div>
                <div>
                </div>
              </div>
            </div>
    );
}

export default PostDetails;








// import { fetchAPI } from "@/services/api";
// import { GetAllPostResponseData } from "~shared/types";
// import PostDetails from "./PostDetails";
// import { PostParams } from "./PostDetails";


// export async function generateStaticParams() {
// 	const postsData:GetAllPostResponseData[] = await fetchAPI('/post/');
//     console.log('posts', postsData); //TESTING
// 	return postsData.map((post) => ({
// 		postId: post.id.toString(),
// 	}));
// }

// const PostDetailsPage = ({params} : {params: PostParams}) => {

//     return <PostDetails params={params} />;
// }

// export default PostDetailsPage  ;

