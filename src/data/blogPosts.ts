import { postsFromFiles, type RawPostFile } from "./postsFromFiles";

export type BlogPost = RawPostFile;

export const blogPosts: BlogPost[] = postsFromFiles;
