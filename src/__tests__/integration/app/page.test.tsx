import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import { setupServer } from "msw/node";
import { postHandlers, posts } from "@/__tests__/mocks/handlers/post-handlers";
// We're using our own custom render function and not React Testing Library's render.
import { renderWithProviders } from "@/__tests__/utils/test-utils";
import HomePage from "@/app/page";
import { createPost, updatePost } from "@/lib/redux/features/post/post-slice";

const server = setupServer(...postHandlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// check if msw is intercepting correctly
// server.events.on("request:start", ({ request }) => {
//   console.log("Outgoing:", request.method, request.url);
// });

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe("Rendering and API Integration of Home Page", () => {
  it("shows home page and loaded posts", async () => {
    renderWithProviders(<HomePage />);
    // should render
    expect(screen.getByText(/Posts/i)).toBeInTheDocument();

    // should show loading initially
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    // after some time, the posts should be received
    expect(await screen.findByText(posts[0].title)).toBeInTheDocument();
  });

  it("creates a new post", async () => {
    const { store } = renderWithProviders(<HomePage />);

    // create a new post
    const newPost = {
      id: 4,
      userId: 1,
      title: "This is a New Post",
      body: "New Post Body",
    };
    act(() => {
      store.dispatch(createPost(newPost));
    });

    // check if the new post is rendered
    expect(await screen.findByText(newPost.title)).toBeInTheDocument();
  });

  it("updates a post", async () => {
    const { store } = renderWithProviders(<HomePage />);

    // update the first post
    const toUpdatePost = {
      id: posts[0].id,
      userId: 1,
      title: "This is a Updated Post",
      body: "New Post Body",
    };
    act(() => {
      store.dispatch(updatePost(toUpdatePost));
    });

    // check if the updated post is rendered
    expect(await screen.findByText(toUpdatePost.title)).toBeInTheDocument();
  });

  it("deletes a post", async () => {
    renderWithProviders(<HomePage />);

    // wait for the posts to load
    expect(await screen.findByText(posts[0].title)).toBeInTheDocument();

    // delete the first post
    const firstPostDeleteButton = screen.getAllByRole("button", {
      name: "Delete",
    })[0];
    fireEvent.click(firstPostDeleteButton);

    // wait for the post to be removed
    expect(
      await screen.findByText(posts[posts.length - 1].title)
    ).not.toBeInTheDocument();
  });
});
