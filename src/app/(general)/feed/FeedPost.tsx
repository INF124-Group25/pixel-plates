import style from "./page.module.css";
import Image from "next/image";

const PostCard: React.FC<{ 
    imageSrc: string; 
    imageName: string; 
    name: string; 
    address: string; 
    number: string; 
    stars: number;
    review_count: number;
    review: string;
    postID: string; 
}> = ({
    imageSrc,
    imageName,
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
            <div>
                <p>{name}</p>
                <p>{address}</p>
                <p>{number}</p>
                <Image src={imageSrc} alt={imageName} width={100} height={100} layout="responsive" />
                <p className={`starsReview`}>{stars} Stars, {review_count} Reviews</p>
            </div>
            <div>
                <p>{review}</p>
            </div>
        </div>
    );
};

export default PostCard;
