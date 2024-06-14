import { Post } from "@/models/post";

interface PostApiParams {
  /**
   * The Mock API endpoint for posts
   */
  endPoint: string;
}

export class PostApi {
  endPoint: string;

  constructor(params: PostApiParams) {
    const { endPoint } = params;
    this.endPoint = endPoint;
    this.getPost = this.getPost.bind(this);
    this.listPosts = this.listPosts.bind(this);
    this.createPost = this.createPost.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  /**
   * Retrieves a post by its ID from the server.
   * @param id - The ID of the post to retrieve.
   * @returns A Promise that resolves to the retrieved post.
   * @throws An error if the request to retrieve the post fails.
   */
  async getPost(id: number): Promise<Post> {
    const response = await fetch(`${this.endPoint}/${id}`);
    if (!response.ok) {
      throw new Error("Failed to get post");
    }
    return response.json();
  }

  /**
   * Fetches a list of posts from the server.
   * @returns A promise that resolves to an array of Post objects.
   * @throws An error if the request fails.
   */
  async listPosts(): Promise<Post[]> {
    const response = await fetch(this.endPoint);
    if (!response.ok) {
      throw new Error("Failed to list posts");
    }
    return await response.json();
  }

  /**
   * Creates a new post.
   * @param body - The post object to be created.
   * @returns A Promise that resolves to the created post.
   * @throws An error if the request to create the post fails.
   */
  async createPost(body: Post): Promise<Post> {
    const response = await fetch(this.endPoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error("Failed to create post");
    }
    return await response.json();
  }

  /**
   * Updates a post.
   * @param body - The updated post object.
   * @returns A Promise that resolves to the updated post.
   * @throws An error if the update fails.
   */
  async updatePost(body: Post): Promise<Post> {
    const response = await fetch(`${this.endPoint}/${body.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error("Failed to update post");
    }
    return await response.json();
  }

  /**
   * Deletes a post with the specified ID.
   * @param id - The ID of the post to delete.
   * @throws Error if the request to delete the post fails.
   */
  async deletePost(id: number): Promise<void> {
    const response = await fetch(`${this.endPoint}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete post");
    }
  }
}
