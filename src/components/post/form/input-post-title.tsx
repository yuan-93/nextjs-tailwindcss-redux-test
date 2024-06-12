"use client";

import { useId } from "react";

interface InputPostTitleProps {
  defaultValue?: string;
}

export function InputPostTitle(props: InputPostTitleProps) {
  const { defaultValue } = props;
  const id = useId();

  return (
    <div className="flex flex-col">
      <label htmlFor={id}>Post Title</label>
      <input
        id={id}
        name="title"
        type="text"
        required
        defaultValue={defaultValue}
        className="border-2 rounded-lg py-2.5 px-2"
      />
    </div>
  );
}
