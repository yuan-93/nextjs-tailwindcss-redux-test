"use client";

import { useId } from "react";

interface InputPostBodyProps {
  defaultValue?: string;
}

export function InputPostBody(props: InputPostBodyProps) {
  const { defaultValue } = props;
  const id = useId();

  return (
    <div className="flex flex-col">
      <label htmlFor={id}>Post Body</label>
      <textarea
        id={id}
        name={"body"}
        required
        defaultValue={defaultValue}
        className="border-2 rounded-lg py-2.5 px-2"
      />
    </div>
  );
}
