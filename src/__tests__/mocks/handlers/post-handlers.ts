import { Post } from "@/models/post";
import { http, HttpResponse } from "msw";

if (!process.env.NEXT_PUBLIC_POST_END_POINT) {
  throw new Error("NEXT_PUBLIC_POST_END_POINT is not set");
}

const endPoint = process.env.NEXT_PUBLIC_POST_END_POINT;

export const posts: Post[] = [
  {
    userId: 1,
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
  },
  {
    userId: 1,
    id: 3,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
  },
];

export const postHandlers = [
  http.get(endPoint, async () => {
    return HttpResponse.json(posts, { status: 200 });
  }),
  http.post(endPoint, async ({ request }) => {
    const newPost = await request.json();

    return HttpResponse.json(newPost, { status: 201 });
  }),
  http.put(`${endPoint}/:id`, async ({ request }) => {
    const toUpdatePost = await request.json();

    return HttpResponse.json(toUpdatePost, { status: 200 });
  }),
  http.delete(`${endPoint}/:id`, async () => {
    return HttpResponse.json(undefined, { status: 200 });
  }),
];
