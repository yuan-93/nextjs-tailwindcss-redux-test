"use client";

import { InputPostBody } from "@/components/post/form/input-post-body";
import { InputPostTitle } from "@/components/post/form/input-post-title";
import { BackButton } from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import { createPost, selectPost } from "@/lib/redux/features/post/post-slice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { PostStatus } from "@/models/post";
import { useRouter } from "next/navigation";

export function PostCreateForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id, userId, status } = useAppSelector(selectPost);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // get the form data
    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
    const body = formData.get("body") as string;

    // create the post
    await dispatch(createPost({ id, userId, title, body })).unwrap();

    router.back();
  };

  return (
    <div className="mx-auto max-w-screen-lg px-6 flex flex-col gap-6">
      <h1>Create Post</h1>
      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <InputPostTitle />
        <InputPostBody />
        <div className="flex flex-row gap-2">
          <BackButton />
          <Button disabled={status === PostStatus.UPDATING} type="submit">
            {status === PostStatus.UPDATING ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
}
