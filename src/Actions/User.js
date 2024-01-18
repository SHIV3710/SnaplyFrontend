import axios from "axios";
import {
  LoadUserFailure,
  LoadUserRequest,
  LoadUserSuccess,
  LoginFailure,
  LoginRequest,
  LoginSuccess,
  postoffollowingFailure,
  postoffollowingRequest,
  postoffollowingSuccess,
  clearError,
  allUsersRequest,
  allUsersSuccess,
  allUsersFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  changePasswordFailure,
  changePasswordRequest,
  changePasswordSuccess,
  changrpassworderror,
  changeProfileRequest,
  deleteProfileRequest,
  deleteProfileSuccess,
  deleteProfileFailure,
  followUserRequest,
  followUserSuccess,
  followUserFailure,
} from "../Store/Reducers/user";

export const loginuser = (email, password) => async (dispatch) => {
  try {
    console.log("Hello");
    dispatch(LoginRequest());
    const { data } = await axios.post(
      "https://snaply-backend.onrender.com/api/v1/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(LoginSuccess(data.user));
  } catch (error) {
    dispatch(LoginFailure(error.response.data.message));
  }
};

export const loaduser = () => async (dispatch) => {
  try {
    dispatch(LoadUserRequest());
    const { data } = await axios.get(
      "https://snaply-backend.onrender.com/api/v1/profile"
    );
    if (data) dispatch(LoadUserSuccess(data.user));
  } catch (error) {
    dispatch(LoadUserFailure(error.response.data.message));
  }
};

export const getfollowingpost = () => async (dispatch) => {
  try {
    dispatch(postoffollowingRequest());
    const { data } = await axios.get(
      "https://snaply-backend.onrender.com/api/v1/posts"
    );
    dispatch(postoffollowingSuccess(data.posts));
  } catch (error) {
    dispatch(postoffollowingFailure(error.response.data.message));
  }
};

export const getAllusers = () => async (dispatch) => {
  try {
    dispatch(allUsersRequest());
    const { data } = await axios.get(
      "https://snaply-backend.onrender.com/api/v1/allusers"
    );
    dispatch(allUsersSuccess(data.Users));
  } catch (error) {
    dispatch(allUsersFailure(error));
  }
};

export const signupuser =
  (name, email, password, image) => async (dispatch) => {
    try {
      dispatch(LoadUserRequest());
      const { data } = await axios.post(
        "api/v1/register",
        { name, email, password, image },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(LoadUserSuccess(data.user));
    } catch (error) {
      dispatch(LoginFailure(error.response.data.message));
    }
  };

export const logoutuser = () => async (dispatch) => {
  try {
    dispatch(logoutRequest());
    const { data } = await axios.get(
      "https://snaply-backend.onrender.com/api/v1/logout"
    );
    dispatch(logoutSuccess(data.message));
  } catch (error) {
    dispatch(logoutFailure(error));
  }
};

export const changepassowrd =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      changePasswordRequest();
      const { data } = await axios.put(
        "https://snaply-backend.onrender.com/api/v1/update/password",
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(changePasswordSuccess(data.message));
    } catch (error) {
      changePasswordFailure(error);
    }
  };

export const changeprofile = (name, email, avatar) => async (dispatch) => {
  try {
    dispatch(changeProfileRequest());
    const { data } = await axios.put(
      "/api/v1/update/profile",
      {
        name,
        email,
        avatar,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);
    dispatch(changePasswordSuccess(data.message));
  } catch (error) {
    dispatch(changePasswordFailure(error.res.message));
  }
};

export const deleteProfile = () => async (dispatch) => {
  try {
    dispatch(deleteProfileRequest());
    const { data } = await axios.delete(
      "https://snaply-backend.onrender.com/api/v1/delete/me"
    );
    dispatch(deleteProfileSuccess(data.message));
  } catch (error) {
    dispatch(deleteProfileFailure(error.res.message));
  }
};

export const followuser = (id) => async (dispatch) => {
  try {
    dispatch(followUserRequest());
    const { data } = await axios.get(
      `https://snaply-backend.onrender.com/api/v1/follow/${id}`
    );
    dispatch(followUserSuccess(data.message));
  } catch (error) {
    dispatch(followUserFailure(error.res.message));
  }
};
