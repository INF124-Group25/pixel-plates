import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

const ProfilePage = () => {
    const name = "JonnieEats";
    const postName = "Cha For Tea - University Town Center";
    const postId = "OxLseuNd";
    const postImage = "/popcorn-chicken.png";

    type posts = {
        name: string;
        imageSrc: string;
    };
    const postImages: posts[] = new Array(24).fill({
        name: postName,
        imageSrc: postImage,
    });

    return (
        <div className={styles.profile}>
            <h1>{name}</h1>
            {postImages && postImages.length > 0 ? (
                <div className={styles.profilePosts}>
                    {postImages.map((image, index) => (
                        <Link
                            key={postId}
                            href={postId}
                            className={styles.profilePostCards}
                            style={{
                                backgroundImage: `url(${image.imageSrc})`,
                                borderRadius: '0px',
                                border: "1px solid black",
                            }}
                        />
                    ))}
                </div>
            ) : (
                <h2>No Images posted yet!</h2>
            )}
        </div>
    );
};

export default ProfilePage;

{
    /* <Image key={index} src={postImage} alt={postName} width={100} height={100}/> */
}
