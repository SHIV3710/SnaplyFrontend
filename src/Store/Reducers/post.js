import { createSlice } from "@reduxjs/toolkit";

export const likeReducer = createSlice({
  name: "like",
  initialState: {
    loading: false,
    message: "",
    error: "",
  },
  reducers: {
    likeRequest: (state, action) => {
      state.loading = true;
    },
    likeSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    likeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state, action) => {
      state.error = null;
    },
    clearMessages: (state, action) => {
      state.message = null;
    },
  },
});

export const {
  likeFailure,
  likeSuccess,
  likeRequest,
  clearErrors,
  clearMessages,
} = likeReducer.actions;

export const likereducer = likeReducer.reducer;

export const addComment = createSlice({
  name: "comment",
  initialState: {
    loading: false,
    message: null,
    error: null,
  },
  reducers: {
    addcommentRequest: (state, action) => {
      state.loading = true;
    },
    addcommentSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    addcommentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addcommentclearErrors: (state, action) => {
      state.error = null;
    },
    addcommentclearMessages: (state, action) => {
      state.message = null;
    },
  },
});

export const {
  addcommentFailure,
  addcommentSuccess,
  addcommentRequest,
  addcommentclearErrors,
  addcommentclearMessages,
} = addComment.actions;

export const addcomment = addComment.reducer;

export const deleteComment = createSlice({
  name: "comment",
  initialState: {
    loading: false,
    message: "",
    error: null,
  },
  reducers: {
    deletecommentRequest: (state, action) => {
      state.loading = true;
    },
    deletecommentSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deletecommentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deletecommentclearErrors: (state, action) => {
      state.error = null;
    },
    deletecommentclearMessages: (state, action) => {
      state.message = null;
    },
  },
});

export const {
  deletecommentFailure,
  deletecommentSuccess,
  deletecommentRequest,
  deletecommentclearErrors,
  deletecommentclearMessages,
} = deleteComment.actions;

export const deletecomment = deleteComment.reducer;

export const MyPostreducer = createSlice({
  name: "mypost",
  initialState: {
    loading: false,
    posts: [],
    error: null,
  },
  reducers: {
    MypostsRequest: (state, action) => {
      state.loading = true;
    },
    MypostsSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    MypostsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    MypostclearError: (state, action) => {
      state.error = null;
    },
  },
});

export const {
  MypostclearError,
  MypostsFailure,
  MypostsRequest,
  MypostsSuccess,
} = MyPostreducer.actions;

export const Mypostreducer = MyPostreducer.reducer;

export const addPost = createSlice({
  name: "addpost",
  initialState: {
    loading: false,
    message: "",
    error: null,
  },
  reducers: {
    addPostRequest: (state, action) => {
      state.loading = true;
    },
    addPostSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    addPostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addPostclearErrors: (state, action) => {
      state.error = null;
    },
    addPostclearMessages: (state, action) => {
      state.message = null;
    },
    deletePostRequest: (state, action) => {
      state.loading = true;
    },
    deletePostSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deletePostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addPostFailure,
  addPostSuccess,
  addPostRequest,
  addPostclearErrors,
  addPostclearMessages,
  deletePostFailure,
  deletePostSuccess,
  deletePostRequest,
} = addPost.actions;

export const addpost = addPost.reducer;

export const changeCaption = createSlice({
  name: "changecaption",
  initialState: {
    loading: false,
    message: "",
    error: null,
  },
  reducers: {
    changeCaptionRequest: (state, action) => {
      state.loading = true;
    },
    changeCaptionSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    changeCaptionFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    changeCaptionclearErrors: (state, action) => {
      state.error = null;
    },
    changeCaptionclearMessages: (state, action) => {
      state.message = null;
    },
  },
});

export const {
  changeCaptionFailure,
  changeCaptionSuccess,
  changeCaptionRequest,
  changeCaptionclearErrors,
  changeCaptionclearMessages,
} = changeCaption.actions;

export const changecaption = changeCaption.reducer;
