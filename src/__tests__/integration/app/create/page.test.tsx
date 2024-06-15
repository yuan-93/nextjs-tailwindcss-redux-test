import { postHandlers } from "@/__tests__/mocks/handlers/post-handlers";
import { renderWithProviders } from "@/__tests__/utils/test-utils";
import CreatePostPage from "@/app/create/page";
import { fireEvent, screen } from "@testing-library/react";
import { setupServer } from "msw/node";

const server = setupServer(...postHandlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    back: jest.fn(),
  }),
}));

describe("Rendering and API Integration of Post Create Page", () => {
  it("shows create post page and create successfully", async () => {
    const { getByLabelText, getByRole, store } = renderWithProviders(
      <CreatePostPage />
    );

    // should render
    expect(screen.getByText(/Create Post/i)).toBeInTheDocument();

    const newPost = {
      id: store.getState().posts.id,
      userId: 1,
      title: "new post",
      body: "new post",
    };

    // fill the form
    // fill the input title
    const inputPostTitle = getByLabelText("Post Title") as HTMLInputElement;
    fireEvent.change(inputPostTitle, { target: { value: newPost.title } });
    expect(inputPostTitle.value).toBe(newPost.title);

    // fill the input body
    const inputPostBody = getByLabelText("Post Body") as HTMLInputElement;
    fireEvent.change(inputPostBody, { target: { value: newPost.body } });
    expect(inputPostBody.value).toBe(newPost.body);

    // submit the form
    const createButton = getByRole("button", {
      name: "Create",
    });
    fireEvent.click(createButton);

    // should show loading
    expect(screen.getByText("Creating...")).toBeInTheDocument();

    // done creating
    expect(await screen.findByText("Create")).toBeInTheDocument();

    // should contain the new post
    expect(store.getState().posts.posts).toContainEqual(newPost);
  });
});
