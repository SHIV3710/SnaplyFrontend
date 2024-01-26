import axios from "axios";
import {
  MypostsFailure,
  MypostsRequest,
  MypostsSuccess,
  addPostFailure,
  addPostRequest,
  addPostSuccess,
  addcommentFailure,
  addcommentRequest,
  addcommentSuccess,
  changeCaptionFailure,
  changeCaptionRequest,
  changeCaptionSuccess,
  deletePostFailure,
  deletePostRequest,
  deletePostSuccess,
  deletecommentFailure,
  deletecommentRequest,
  deletecommentSuccess,
  likeFailure,
  likeRequest,
  likeSuccess,
} from "../Store/Reducers/post";
import Cookies from "js-cookie";

export const likepost = (id) => async (dispatch) => {
  try {
    dispatch(likeRequest());
    const { data } = await axios.get(
      `http://localhost:4000/api/v1/post/${id}`,
      {
        params: {
          token: Cookies.get("token"),
        },
      }
    );
    dispatch(likeSuccess(data.message));
  } catch (error) {
    dispatch(likeFailure(error));
  }
};

export const commentonpost = (id, comment, user) => async (dispatch) => {
  try {
    dispatch(addcommentRequest());
    const { data } = await axios.put(
      `http://localhost:4000/api/v1/post/comment/${id}`,
      {
        comment: comment,
        user: user,
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
    dispatch(addcommentSuccess(data.message));
  } catch (error) {
    dispatch(addcommentFailure(error));
  }
};

export const deletecomment = (id, commentid) => async (dispatch) => {
  try {
    dispatch(deletecommentRequest());
    const { data } = await axios.post(
      `api/v1/post/comment/${id}`,
      {
        commentid,
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
    dispatch(deletecommentSuccess(data.message));
  } catch (error) {
    dispatch(deletecommentFailure(error));
  }
};

export const getMyPosts = () => async (dispatch) => {
  try {
    dispatch(MypostsRequest());
    const { data } = await axios.get(
      `http://localhost:4000/api/v1/profile/post`,
      {
        params: {
          token: Cookies.get("token"),
        },
      }
    );
    dispatch(MypostsSuccess(data.posts));
  } catch (error) {
    dispatch(MypostsFailure(error));
  }
};

export const addPost = (image, caption) => async (dispatch) => {
  try {
    dispatch(addPostRequest());
    const { data } = await axios.post(
      `http://localhost:4000/api/v1/post/upload`,
      {
        caption: caption,
        image: image,
      },
      {
        params: {
          token: Cookies.get("token"),
        },
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(addPostSuccess(data.message));
  } catch (error) {
    dispatch(addPostFailure(error));
  }
};

export const updatecaption = (id, caption) => async (dispatch) => {
  try {
    console.log(id, caption);
    dispatch(changeCaptionRequest());
    const { data } = await axios.put(
      `http://localhost:4000/api/v1/post/${id}`,
      {
        caption: caption,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(data);
    dispatch(changeCaptionSuccess(data.message));
  } catch (error) {
    dispatch(changeCaptionFailure(error));
  }
};

export const deletepost = (id) => async (dispatch) => {
  try {
    dispatch(deletePostRequest());
    const { data } = await axios.delete(
      `http://localhost:4000/api/v1/post/${id}`,
      {
        params: {
          token: Cookies.get("token"),
        },
      }
    );
    console.log(data);
    dispatch(deletePostSuccess(data.message));
  } catch (error) {
    dispatch(deletePostFailure(error));
  }
};
