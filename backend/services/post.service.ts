import { db } from "../db/db";
import { post, Post } from "../db/schema";

export const getPostsByKeywordWithPagination = async (
    keyword: string,
    pageNumber: number
) => {
    // const pageSize = 10;
    // // await db.query.posts.findMany({
    // //     limit: 5,
    // //     offset: 2, 
    // // });
    // const postRecords = await db
    //     .select()
    //     .from(post)
    //     .where("title", "like", `%${keyword}%`)
    //     .limit(pageSize)
    //     .offset(pageSize * (pageNumber - 1));
};

export const getAllPost = async() => {
    const posts = await db.select().from(post);
    return posts;
};