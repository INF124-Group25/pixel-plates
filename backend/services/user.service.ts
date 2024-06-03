import { NewUser, User, user } from "db/schema";
import { VerifiedUser } from "types/types";
import { eq } from "drizzle-orm";
import { db } from "db/db";

const getUserWithToken = async(decodedId:string) => {
    const verifyUser:VerifiedUser[] = await db
    .select({
        id: user.id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        profile_image_URL: user.profile_image_URL,
        created_at: user.created_at,
    })
    .from(user)
    .where(eq(user.id, decodedId));
    return verifyUser;
};

const updateUserWithUser = async(userChanges:NewUser, isPasswordChanged:boolean, currentUserId: string) => {
    let updatedUser:User[];
    if(isPasswordChanged){
        updatedUser = await db
        .update(user)
        .set(userChanges)
        .where(eq(user.id, currentUserId))
        .returning();
    }else{
        updatedUser = await db
        .update(user)
        .set({
            username: userChanges.username,
            email: userChanges.email,
            bio: userChanges.bio,
            profile_image_URL: userChanges.profile_image_URL,
        })
        .where(eq(user.id, currentUserId))
        .returning();
    }
    return updatedUser[0];
};

export { getUserWithToken, updateUserWithUser };