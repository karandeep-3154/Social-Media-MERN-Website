import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: {},
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
  },
});

export default postSlice.reducer;

export function SetPosts(post) {
  return (dispatch, getState) => {
    dispatch(postSlice.actions.setPosts(post));
  };
}
