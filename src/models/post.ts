/**
 * Post type from https://jsonplaceholder.typicode.com/posts
 */
export interface Post {
  /**
   * User ID
   */
  userId: number;
  /**
   * Post ID
   */
  id: number;
  /**
   * Post title
   */
  title: string;
  /**
   * Post description/body
   */
  body: string;
}
