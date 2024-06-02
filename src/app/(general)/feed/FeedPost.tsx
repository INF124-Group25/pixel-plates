import style from "./page.module.css";
import Image from "next/image";

const PostCard: React.FC<{ 
    // imageSrc: string; 
    // imageName: string; 
    name: string; 
    address: string; 
    number: string; 
    stars: number;
    review_count: number;
    review: string;
    postID: string; 
}> = ({
    // imageSrc,
    // imageName,
    name,
    address,
    number,
    stars,
    review_count,
    review,
    postID,
}) => {
    return (
        <div className={style.postCard}> 
            <div className={style.postTitle}>
                <p>{name}</p>
            </div>
            <div className={style.postBody}>
                <div className={style.postInfo}>
                <p>{address}</p>
                <p className={style.Number}>{number}</p>
                <p className={style.starsReview}>{stars} Stars, {review_count} Reviews</p>
                {/* <Image src={imageSrc} alt={imageName} className={style.postImage} width={100} height={100} layout="responsive" />  */}
                </div>
                <div className={style.postReview}>
                    <p className={style.Review_title}>Review:</p>
                    <p className={style.Review_word}>{review}</p>
                </div>
            </div>
            
        </div>
    );
};

export default PostCard;
