import { ExternalLink } from "@/components/ui/external-link";
import { Link } from "@/components/ui/link";
import { PostList } from "./post-list";
import { postCreatePath } from "@/lib/route-paths";

export function PostsPage() {
  return (
    <div className="mx-auto max-w-screen-lg px-6 flex flex-col gap-6">
      <h1>Posts</h1>
      <p>
        Since{" "}
        <ExternalLink href="https://jsonplaceholder.typicode.com/" newTab>
          Jsonplaceholder
        </ExternalLink>{" "}
        does not save state on the server, the <b>Create</b>, <b>Update</b> and{" "}
        <b>Delete</b> actions done here are only affecting the local states,
        once refreshed, the data will be reset and fetches fresh data from
        Jsonplaceholder.
      </p>
      <Link href={postCreatePath}>Create</Link>
      <PostList />
    </div>
  );
}
