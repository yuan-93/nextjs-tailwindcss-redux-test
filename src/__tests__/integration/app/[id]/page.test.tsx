import { postHandlers, posts } from "@/__tests__/mocks/handlers/post-handlers";
import { renderWithProviders } from "@/__tests__/utils/test-utils";
import UpdatePostPage from "@/app/[id]/page";
import { initialState } from "@/lib/redux/features/post/post-slice";
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

describe("Rendering and API Integration of Post Update Page", () => {
  it("shows update post page and update successfully", async () => {
    const toUpdateId = 1;

    // preload with posts to update
    const { getByLabelText, getByRole, store } = renderWithProviders(
      <UpdatePostPage params={{ id: `${toUpdateId}` }} />,
      {
        preloadedState: {
          posts: {
            ...initialState,
            posts,
          },
        },
      }
    );

    // should render
    expect(screen.getByText(/Update Post/i)).toBeInTheDocument();

    const toUpdatePost = {
      id: toUpdateId,
      userId: 1,
      title: "to update post",
      body: "to update post",
    };

    // fill the form
    // fill the input title
    const inputPostTitle = getByLabelText("Post Title") as HTMLInputElement;
    fireEvent.change(inputPostTitle, { target: { value: toUpdatePost.title } });
    expect(inputPostTitle.value).toBe(toUpdatePost.title);

    // fill the input body
    const inputPostBody = getByLabelText("Post Body") as HTMLInputElement;
    fireEvent.change(inputPostBody, { target: { value: toUpdatePost.body } });
    expect(inputPostBody.value).toBe(toUpdatePost.body);

    // submit the form
    const updateButton = getByRole("button", {
      name: "Update",
    });
    fireEvent.click(updateButton);

    // should show loading
    expect(screen.getByText("Updating...")).toBeInTheDocument();

    // done updating
    expect(await screen.findByText("Update")).toBeInTheDocument();

    // should update the post
    expect(store.getState().posts.posts).toContainEqual(toUpdatePost);
  });
});
