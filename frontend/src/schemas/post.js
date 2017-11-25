import { schema } from 'normalizr';

export const postSchema = new schema.Entity('posts');

// const postsSchema = new schema.Array(postSchema);
export const postListSchema = [ postSchema ];
