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
  anyuserFailure,
  anyuserRequest,
  anyuserSuccess,
} from "../Store/Reducers/user";
import Cookies from "js-cookie";

export const loginuser = (email, password) => async (dispatch) => {
  try {
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
    Cookies.set("token", data.token, { expires: 30 });
    dispatch(LoginSuccess(data.user));
  } catch (error) {
    dispatch(LoginFailure(error.response.data.message));
  }
};

export const loaduser = () => async (dispatch) => {
  try {
    dispatch(LoadUserRequest());
    const { data } = await axios.get(
      "https://snaply-backend.onrender.com/api/v1/profile",
      {
        params: {
          token: Cookies.get("token"),
        },
      }
    );
    dispatch(LoadUserSuccess(data.user));
  } catch (error) {
    dispatch(LoadUserFailure(error.message));
  }
};

export const getfollowingpost = () => async (dispatch) => {
  try {
    dispatch(postoffollowingRequest());
    const { data } = await axios.get(
      "https://snaply-backend.onrender.com/api/v1/posts",
      {
        params: {
          token: Cookies.get("token"),
        },
      }
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
      "https://snaply-backend.onrender.com/api/v1/allusers",
      {
        params: {
          token: Cookies.get("token"),
        },
      }
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
          params: {
            token: Cookies.get("token"),
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Cookies.set("token", data.token, { expires: 30 });
      dispatch(LoadUserSuccess(data.user));
    } catch (error) {
      dispatch(LoginFailure(error.response.data.message));
    }
  };

export const logoutuser = () => async (dispatch) => {
  try {
    dispatch(logoutRequest());
    const { data } = await axios.get(
      "https://snaply-backend.onrender.com/api/v1/logout",
      {
        params: {
          token: Cookies.get("token"),
        },
      }
    );
    Cookies.set("token", null);
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
          params: {
            token: Cookies.get("token"),
          },
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
      "https://snaply-backend.onrender.com/api/v1/update/profile",
      {
        name,
        email,
        avatar,
      },
      {
        params: {
          token: Cookies.get("token"),
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(changePasswordSuccess(data.message));
  } catch (error) {
    dispatch(changePasswordFailure(error.res.message));
  }
};

export const deleteProfile = () => async (dispatch) => {
  try {
    dispatch(deleteProfileRequest());
    const { data } = await axios.delete("api/v1/delete/me");
    dispatch(deleteProfileSuccess(data.message));
  } catch (error) {
    dispatch(deleteProfileFailure(error.res.message));
  }
};

export const followuser = (id) => async (dispatch) => {
  try {
    dispatch(followUserRequest());
    const { data } = await axios.get(
      `https://snaply-backend.onrender.com/api/v1/follow/${id}`,
      {
        params: {
          token: Cookies.get("token"),
        },
      }
    );
    console.log(data);
    dispatch(followUserSuccess(data.message));
  } catch (error) {
    dispatch(followUserFailure(error.res.message));
  }
};

export const anyuser = (id) => async (dispatch) => {
  try {
    dispatch(anyuserRequest());
    const { data } = await axios.get(
      `https://snaply-backend.onrender.com/api/v1/profile/${id}`,
      {
        params: {
          token: Cookies.get("token"),
        },
      }
    );
    console.log(data);
    dispatch(anyuserSuccess(data.user));
  } catch (error) {
    dispatch(anyuserFailure(error));
  }
};
