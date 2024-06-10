import { useState, useEffect } from 'react';
import { getPictureWithKey, getPostPicture, getUserPicture } from '@/services/api';
import Image from 'next/image';
import Link from 'next/link';


interface Post {
    id: string;
    business_id: string;
    created_at: Date;
    user_id: string;
    caption: string | null;
    review: string | null;
    post_url: string | null;
}

interface PostWithImage extends Post {
    image: string;
}

type PostRequest =  [Post][]


const PostsList = () => {
    const [posts, setPosts] = useState<PostWithImage[]>([]);
    const defaultImage = getUserPicture('default-user.png');


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postResponse = await fetch('http://localhost:5001/api/test/user/erick/post'); // REPLACE WITH CURRENT USER
                const postData: PostRequest = await postResponse.json();

                console.log("postData: ", postData)

                const postsWithImages = await Promise.all(postData[0].map(async (post: Post) => {
                    const image = getPostPicture(post.id);
                    return { ...post, image };
                }));

                setPosts(postsWithImages);
            } catch (error) {
                console.log(error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
            {posts.map((post, index) => (
                post.image && (
                    <Link key={index} href={`/user/erick/post/${post.id}`} passHref>
                            <Image 
                            src={post.image} 
                            alt={post && post.caption ? post.caption : 'a post image'} 
                            width={200} 
                            height={100} 
                            objectFit="cover"
                            onClick={() => window.location.href = `/user/erick/post/${post.id}`}
                        />       
                    </Link>
                )
            ))}
        </div>
    );
};

export default PostsList;