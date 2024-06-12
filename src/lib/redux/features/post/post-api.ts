import { Post } from "@/models/post";

const endPoint = "https://jsonplaceholder.typicode.com/posts";

export class PostApi {
  endPoint: string;
  constructor() {
    this.endPoint = endPoint;
    this.getPost = this.getPost.bind(this);
    this.listPosts = this.listPosts.bind(this);
    this.createPost = this.createPost.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  async getPost(id: number): Promise<Post> {
    const response = await fetch(`${this.endPoint}/${id}`);
    if (!response.ok) {
      throw new Error("Failed to get post");
    }
    return response.json();
  }

  async listPosts(): Promise<Post[]> {
    const response = await fetch(this.endPoint);
    if (!response.ok) {
      throw new Error("Failed to list posts");
    }
    return await response.json();
  }

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

  async deletePost(id: number): Promise<void> {
    const response = await fetch(`${this.endPoint}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete post");
    }
  }
}
