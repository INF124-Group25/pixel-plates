import {
    integer,
    serial,
    text,
    timestamp,
    varchar,
    real,
    uuid,
    primaryKey
} from "drizzle-orm/pg-core";
import { pgTable, pgSchema } from "drizzle-orm/pg-core";

export const mySchema = pgSchema("my_schema");
// Define tables
const user = pgTable("user", {
    id: uuid("id").primaryKey(),
    username: varchar("username", { length: 255 }).unique().notNull(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    bio: text("bio").default(''),
    profile_image_URL: varchar("profile_image_URL", { length: 255 }).default('placeholder'),
    created_at: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

const userFollowing = pgTable("user_following", {
    user_id: uuid("user_id").notNull().references(() => user.id),
    following_id: uuid("following_id").notNull().references(() => user.id),
    created_at: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
    pk: primaryKey({ columns: [table.user_id, table.following_id]})
}));

const post = pgTable("post", {
    id: uuid("id").primaryKey(),
    user_id: uuid("user_id").references(() => user.id).notNull(),
    business_id: uuid("business_id").notNull(),
    caption: varchar("caption", { length: 255 }),
    review: text("review"),
    created_at: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

const imageUrl = pgTable("image_Url", {
    id: uuid("id").primaryKey(),
    post_id: uuid("post_id").references(() => post.id).notNull(),
    url: varchar("url", { length: 255 }),
    created_at: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

const business = pgTable("business", {
    id: uuid("id").primaryKey(),
    business_name: varchar("business_name", { length: 255 }).notNull(),
    address: varchar("address", { length: 255 }).notNull(),
    phone_number: varchar("phone_number", { length: 255 }),
    star_rating: real("star_rating"),
    review_count: integer("review_count"),
    created_at: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

const businessReview = pgTable("business_review", {
    business_id: uuid("business_id").references(() => business.id),
    post_id: uuid("post_id").references(() => post.id),
    created_at: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table)=>({
    pk: primaryKey({columns:[table.business_id, table.post_id]})
}));

export type User = typeof user.$inferSelect; 
export type NewUser = typeof user.$inferInsert; 
export type UserFollowing = typeof userFollowing.$inferSelect; 
export type NewUserFollowing = typeof userFollowing.$inferInsert; 
export type Post = typeof post.$inferSelect; 
export type NewPost = typeof post.$inferInsert; 
export type ImageUrl = typeof imageUrl.$inferSelect; 
export type NewImageUrl = typeof imageUrl.$inferInsert; 
export type Business = typeof business.$inferSelect; 
export type NewBusiness = typeof business.$inferInsert; 
export type BusinessReview = typeof businessReview.$inferSelect; 
export type NewBusinessReview = typeof businessReview.$inferInsert; 
export { user, userFollowing, post, imageUrl, business, businessReview };