"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();

  const onBack: React.MouseEventHandler<HTMLButtonElement> = (evt) => {
    evt.preventDefault();
    router.back();
  };

  return (
    <Button type="button" variant="outline" onClick={onBack}>
      Back
    </Button>
  );
}
