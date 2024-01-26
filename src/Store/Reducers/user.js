import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {},
  loading: false,
  auth: false,
  posts: [],
  users: [],
  message: "",
};

export const userReducer = createSlice({
  name: "user",
  initialState: {
    user: {},
    loading: false,
    auth: false,
    message: "",
    seeuser: undefined,
  },
  reducers: {
    LoginRequest: (state) => {
      state.loading = true;
    },
    LoginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.auth = true;
    },
    LoginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.auth = false;
    },
    RegisterRequest: (state) => {
      state.loading = true;
    },
    RegisterSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.auth = true;
    },
    RegisterFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.auth = false;
    },
    LoadUserRequest: (state) => {
      state.loading = true;
    },
    LoadUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      if (action.payload) state.auth = true;
    },
    LoadUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.auth = false;
    },
    LogoutUserRequest: (state) => {
      state.loading = true;
    },
    LogoutUserSuccess: (state) => {
      state.loading = false;
      state.user = null;
    },
    LogoutUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutRequest: (state, action) => {
      state.loading = true;
    },
    logoutSuccess: (state, action) => {
      state.loading = false;
      state.user = null;
      state.auth = null;
    },
    logoutFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logutclearErrors: (state, action) => {
      state.error = null;
    },
    changePasswordRequest: (state, action) => {
      state.loading = true;
    },
    changePasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    changePasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    changePassworderror: (state, action) => {
      state.error = null;
    },
    userClearMessages: (state, action) => {
      state.message = null;
    },
    userClearErrors: (state, action) => {
      state.error = null;
    },
    changeProfileRequest: (state, action) => {
      state.loading = true;
    },
    changeProfileSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    changeProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteProfileRequest: (state, action) => {
      state.loading = true;
    },
    deleteProfileSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.auth = false;
    },
    deleteProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.auth = true;
    },
    followUserRequest: (state, action) => {
      state.loading = true;
    },
    followUserSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    followUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    anyuserRequest: (state, action) => {
      state.loading = true;
    },
    anyuserSuccess: (state, action) => {
      state.loading = false;
      state.seeuser = action.payload;
    },
    anyuserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  LoginRequest,
  LoginFailure,
  LoginSuccess,
  RegisterFailure,
  RegisterSuccess,
  RegisterRequest,
  LoadUserFailure,
  LoadUserRequest,
  LoadUserSuccess,
  logoutFailure,
  logoutRequest,
  logoutSuccess,
  logoutclearErrors,
  changePasswordFailure,
  changePasswordRequest,
  changePasswordSuccess,
  changrpassworderror,
  userClearErrors,
  userClearMessages,
  changeProfileFailure,
  changeProfileRequest,
  changeProfileSuccess,
  deleteProfileFailure,
  deleteProfileRequest,
  deleteProfileSuccess,
  followUserRequest,
  followUserFailure,
  followUserSuccess,
  anyuserFailure,
  anyuserRequest,
  anyuserSuccess,
} = userReducer.actions;
export const userreducer = userReducer.reducer;

export const postoffollowingreducer = createSlice({
  name: "postoffollowing",
  initialState: {
    loading: false,
    posts: [],
    error: "",
  },
  reducers: {
    postoffollowingRequest: (state) => {
      state.loading = true;
    },
    postoffollowingSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    postoffollowingFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});
export const {
  postoffollowingFailure,
  postoffollowingRequest,
  postoffollowingSuccess,
  clearError,
} = postoffollowingreducer.actions;
export const postOffollowingReducer = postoffollowingreducer.reducer;

export const allUserReducer = createSlice({
  name: "allUsers",
  initialState: {
    loading: false,
    users: [],
    error: "",
  },
  reducers: {
    allUsersRequest: (state, action) => {
      state.loading = true;
    },
    allUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    allUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state, action) => {
      state.error = null;
    },
  },
});
export const {
  allUsersRequest,
  allUsersSuccess,
  allUsersFailure,
  clearErrors,
} = allUserReducer.actions;
export const allUserreducer = allUserReducer.reducer;

export const ChangePassword = createSlice({
  name: "changepassword",
  initialState,
  reducers: {},
});
