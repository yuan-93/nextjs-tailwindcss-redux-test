"use client";

import { BackButton } from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import { selectPost, updatePost } from "@/lib/redux/features/post/post-slice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { useRouter } from "next/navigation";
import { InputPostBody } from "./input-post-body";
import { InputPostTitle } from "./input-post-title";
import { PostStatus } from "@/models/post";

interface PostUpdateFormProps {
  id: number;
}

export function PostUpdateForm(props: PostUpdateFormProps) {
  const { id } = props;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { userId, posts, status } = useAppSelector(selectPost);

  const post = posts?.find((post) => post.id === id);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // get the form data
    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
    const body = formData.get("body") as string;

    // update the post
    await dispatch(updatePost({ id: id, userId, title, body })).unwrap();

    router.back();
  };

  return (
    <div className="mx-auto max-w-screen-lg px-6 flex flex-col gap-6">
      <h1>Update Post {id}</h1>
      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <InputPostTitle defaultValue={post?.title} />
        <InputPostBody defaultValue={post?.body} />
        <div className="flex flex-row gap-2">
          <BackButton />
          <Button disabled={status === PostStatus.UPDATING} type="submit">
            {status === PostStatus.UPDATING ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </div>
  );
}
