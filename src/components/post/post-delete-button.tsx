"use client";

import { Button } from "@/components/ui/button";
import {
  PostStatus,
  deletePost,
  selectPost,
} from "@/lib/redux/features/post/post-slice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";

interface PostDeleteButtonProps {
  id: number;
}

export function PostDeleteButton(props: PostDeleteButtonProps) {
  const { id } = props;
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(selectPost);

  const onDelete = () => {
    dispatch(deletePost(id));
  };

  return (
    <Button disabled={status === PostStatus.UPDATING} onClick={onDelete}>
      Delete
    </Button>
  );
}
