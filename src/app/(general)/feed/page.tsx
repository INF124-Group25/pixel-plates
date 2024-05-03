import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import FollowerCard from "../profile/following/Card";
import PostCard from "./FeedPost";



const FeedPage = () => {
    const name = "Feed";
    const postName = "Cha For Tea - University Town Center";
    const postId = "OxLseuNd";
    const postImage = "/popcorn-chicken.png";
    
    
    type TUsers = {
        src:string, 
        name: string,
        bio: string,
        // id: 1
      };
    const users: TUsers[] = [
        {
            src: "/user6.png",
            name: "TheLink",
            bio: "Hello, I'm frank! I collaborate with small business around the world to introduce new foods to try on your next visit!"
        },
        {
            src: "/user5.png",
            name: "doofdoof",
            bio: "Rating the best places for your doggo to get their grubs"
        },
        {
            src: "/user4.png",
            name: "TheOneAndOnly",
            bio: "Michelin Star Only. DM for collab."
        },
        {
            src: "/user3.png",
            name: "SumoEater",
            bio:"Consumer of the most worthy of foods. Will do a food challenge any day!"
        },
        {
            src: "/user2.png",
            name: "breakfastLover",
            bio: "name the breakfast joint and i'll be there! love me some green eggs and ham"
        },
        {
            src: "/user1.png",
            name: "ExquisiteTaste",
            bio: "I enjoy the finer things in life, including food of high caliber."
        },
        {
            src: "/user4.png",
            name: "TheOneAndOnly",
            bio: "Michelin Star Only. DM for collab."
        },
        {
            src: "/user3.png",
            name: "SumoEater",
            bio:"Consumer of the most worthy of foods. Will do a food challenge any day!"
        },
        {
            src: "/user2.png",
            name: "breakfastLover",
            bio: "name the breakfast joint and i'll be there! love me some green eggs and ham"
        },
        {
            src: "/user1.png",
            name: "ExquisiteTaste",
            bio: "I enjoy the finer things in life, including food of high caliber."
        },
    ]

    type Post = {
        name: string;
        imageSrc: string;
        address: string;
        number: string;
        stars: number;
        review_count: number;
        review: string;
        postID: string;
    };

    const posts: Post[] = users.map((user, index) => ({
        name: postName,
        imageSrc: postImage,
        address: "4187 Campus Dr Ste M173 Irvine, CA 92612",
        number: "(949) 725-0300",
        stars: 3.8,
        review_count: 1009,
        review: "I really recommend giving this place a try. The two items I got were popcorn chicken and brown sugar milk tea. I love the popcorn chicken from this place. Especially the sauce that they give to compliment the spiciness if you want to add a bit of sweetness. The boba here is really soft and chewy, their brown sugar milk tea is the best I’ve had in this area. 100% recommend!",
        postID: postId,
    }));

    return (
        <div className={styles.profile}>
            <h1>{name}</h1>
            {posts.length > 0 && users.length > 0 ? (
                <div className={styles.followingPage}>
                    <div className={styles.cardGrid}>
                        {users.map((user, index) => (
                            <div key={`${index}-${user.name}`} className={styles.cardRow}>
                                <FollowerCard src={user.src} name={user.name} bio={user.bio} />
                                <PostCard
                                    imageSrc={posts[index].imageSrc}
                                    imageName={posts[index].name}
                                    name={posts[index].name}
                                    address={posts[index].address}
                                    number={posts[index].number}
                                    stars={posts[index].stars}
                                    review_count={posts[index].review_count}
                                    review={posts[index].review}
                                    postID={posts[index].postID}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <h2>No Followers or Posts 🥺</h2>
            )}
        </div>
    );
};

export default FeedPage;

{
    /* <Image key={index} src={postImage} alt={postName} width={100} height={100}/> */
}
