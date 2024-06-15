import { createAppSlice } from "@/lib/redux/createAppSlice";
import { PostApi } from "@/lib/redux/features/post/post-api";
import { Post, PostStatus } from "@/models/post";

/**
 * Represents the state of the post slice in the Redux store.
 */
export interface PostSliceState {
  /**
   * An array of posts.
   */
  posts?: Post[];

  /**
   * The current status of the post slice.
   * init: The initial state of the slice.
   * idle: The slice is not performing any operation.
   * loading: The slice is fetching data from the server.
   * error: An error occurred while fetching data from the server.
   * updating: The slice is updating data locally.
   */
  status: "init" | "idle" | "loading" | "error" | "updating";

  /**
   * Auto-incrementing ID for new posts.
   */
  id: number;

  /**
   * The ID of the user who created the post.
   */
  userId: number;
}

/**
 * Represents the initial state for the post slice.
 */
export const initialState: PostSliceState = {
  posts: undefined,
  status: PostStatus.INIT,
  id: 0,
  userId: 1,
};

if (!process.env.NEXT_PUBLIC_POST_END_POINT) {
  throw new Error("NEXT_PUBLIC_POST_END_POINT is not set");
}

const postApi = new PostApi({
  endPoint: process.env.NEXT_PUBLIC_POST_END_POINT,
});

export const postSlice = createAppSlice({
  name: "posts",
  initialState,
  reducers: (create) => ({
    /**
     * Fetches a list of posts from the server. Reverses the posts to order in descending order.
     */
    listPosts: create.asyncThunk(
      async () => {
        return (await postApi.listPosts()).reverse();
      },
      {
        pending: (state) => {
          state.status = PostStatus.LOADING;
        },
        fulfilled: (state, action) => {
          state.status = PostStatus.IDLE;
          state.posts = action.payload;
          /**
           * increment the id to the next available id
           */
          state.id = action.payload[0].id + 1;
        },
        rejected: (state) => {
          state.status = PostStatus.ERROR;
        },
      }
    ),
    /**
     * Creates a new post.
     */
    createPost: create.asyncThunk(
      async (data: Post) => {
        /**
         * the mock created result is always id 101, that is why the data is returned instead
         */
        await postApi.createPost(data);
        return data;
      },
      {
        pending: (state) => {
          state.status = PostStatus.UPDATING;
        },
        fulfilled: (state, action) => {
          state.status = PostStatus.IDLE;
          if (!state.posts) {
            state.posts = [action.payload];
          } else {
            state.posts = [action.payload, ...state.posts];
          }
          state.id++;
        },
        rejected: (state) => {
          state.status = PostStatus.ERROR;
        },
      }
    ),
    /**
     * Updates an existing post.
     */
    updatePost: create.asyncThunk(
      async (data: Post) => {
        if (data.id > 100) {
          return data;
        }
        /**
         * the mock api only allow update within its own id range, 100 and below
         */
        return await postApi.updatePost(data);
      },
      {
        pending: (state) => {
          state.status = PostStatus.UPDATING;
        },
        fulfilled: (state, action) => {
          state.status = PostStatus.IDLE;
          if (!state.posts) {
            return;
          }
          const index = state.posts.findIndex(
            (post) => post.id === action.payload.id
          );
          if (index === -1) return;
          state.posts[index] = action.payload;
        },
        rejected: (state) => {
          state.status = PostStatus.ERROR;
        },
      }
    ),
    /**
     * Deletes an existing post.
     */
    deletePost: create.asyncThunk(
      async (id: number) => {
        await postApi.deletePost(id);
        return id;
      },
      {
        pending: (state) => {
          state.status = PostStatus.UPDATING;
        },
        fulfilled: (state, action) => {
          state.status = PostStatus.IDLE;
          if (!state.posts) {
            return;
          }
          state.posts = state.posts.filter(
            (post) => post.id !== action.payload
          );
        },
        rejected: (state) => {
          state.status = PostStatus.ERROR;
        },
      }
    ),
  }),
  selectors: {
    selectPost: (state) => state,
  },
});

export const { listPosts, createPost, updatePost, deletePost } =
  postSlice.actions;

export const { selectPost } = postSlice.selectors;
