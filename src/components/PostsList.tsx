import { useState, useEffect } from 'react';
import { getPostPicture } from '@/services/api';
import Image from 'next/image';
import Link from 'next/link';


interface Post {
    business_id: string;
    caption: string;
    created_at: string;
    id: string;
    post_url: string;
    review: string;
    user_id: string;
    imageUrl?: string; // optional field for the image URL
}

const PostsList = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postResponse = await fetch('http://localhost:5001/api/test/user/erick/post'); // REPLACE WITH CURRENT USER
                const postData = await postResponse.json();

                console.log("postData: ", postData)

                const postsWithImages = await Promise.all(postData[0].map(async (post: Post) => {
                    const imageUrl = await getPostPicture(post.id);
                    return { ...post, imageUrl };
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
                post.imageUrl && (
                    <Link key={index} href={`/user/erick/post/${post.id}`} passHref legacyBehavior>
                            <Image 
                            src={post.imageUrl} 
                            alt={post.caption} 
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