import { createAppSlice } from "@/lib/redux/createAppSlice";
import { PostApi } from "@/lib/redux/features/post/post-api";
import { Post } from "@/models/post";

export enum PostStatus {
  INIT = "init",
  IDLE = "idle",
  LOADING = "loading",
  UPDATING = "updating",
  ERROR = "error",
}

export interface PostSliceState {
  posts?: Post[];
  status: "init" | "idle" | "loading" | "error" | "updating";
  id: number;
  userId: number;
}

const initialState: PostSliceState = {
  posts: undefined,
  status: PostStatus.INIT,
  id: 101,
  userId: 1,
};

const postApi = new PostApi();

export const postSlice = createAppSlice({
  name: "posts",
  initialState,
  reducers: (create) => ({
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
        },
        rejected: (state) => {
          state.status = PostStatus.ERROR;
        },
      }
    ),
    createPost: create.asyncThunk(
      async (data: Post) => {
        /**
         * the mock create result is always id 101, that is why the data is returned instead
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
