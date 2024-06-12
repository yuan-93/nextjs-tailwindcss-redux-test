"use client";

import { listPosts, selectPost } from "@/lib/redux/features/post/post-slice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { useEffect } from "react";
import { PostCard } from "./post-card";
import { PostStatus } from "@/models/post";

export function PostList() {
  const dispatch = useAppDispatch();
  const { posts, status } = useAppSelector(selectPost);

  useEffect(() => {
    /**
     * to keep the state edited on local alive, only fetch posts if it's not available
     */
    if (!posts) {
      dispatch(listPosts());
    }
  }, [dispatch, posts]);

  if (status === PostStatus.LOADING || status === PostStatus.INIT) {
    return <div>Loading...</div>;
  }

  if (status === PostStatus.ERROR) {
    return <div>Failed to load posts</div>;
  }

  if (!posts) {
    return <p>No Data Available</p>;
  }

  return (
    <>
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
}
