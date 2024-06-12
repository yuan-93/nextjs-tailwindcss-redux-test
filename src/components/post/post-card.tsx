"use client";

import { PostDeleteButton } from "@/components/post/post-delete-button";
import { Link } from "@/components/ui/link";
import { selectPost } from "@/lib/redux/features/post/post-slice";
import { useAppSelector } from "@/lib/redux/hooks";
import { postUpdatePath } from "@/lib/route-paths";
import { Post, PostStatus } from "@/models/post";

interface PostCardProps {
  post: Post;
}

export function PostCard(props: PostCardProps) {
  const { post } = props;
  const { status } = useAppSelector(selectPost);

  const className = status === PostStatus.UPDATING ? "opacity-50" : "";

  return (
    <div
      className={`relative shadow-lg py-6 px-4 rounded-lg grid grid-cols-12 gap-2 border ${className}`}
    >
      <div className="col-span-12 md:col-span-10">
        <h3 className=" text-pretty">{post.title}</h3>
        <p className=" text-pretty">{post.body}</p>
      </div>
      <div className="col-span-12 md:col-span-2 flex flex-row md:flex-col gap-2 items-center justify-end md:justify-center">
        <Link href={postUpdatePath(post.id)}>Update</Link>
        <PostDeleteButton id={post.id} />
      </div>
      <div className="absolute right-2 top-2">{post.id}</div>
    </div>
  );
}
