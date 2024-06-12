import { PostUpdateForm } from "@/components/post";

interface PageProps {
  params: {
    id: string;
  };
}
export default function Page(props: PageProps) {
  const {
    params: { id },
  } = props;

  return <PostUpdateForm id={Number(id)} />;
}
