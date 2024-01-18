import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GoHeart } from "react-icons/go";
import { BiComment } from "react-icons/bi";
import { TbHttpDelete } from "react-icons/tb";
import { FaRegComment } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  commentonpost,
  deletepost,
  getMyPosts,
  likepost,
  updatecaption,
} from "../Actions/Post";

import {
  clearErrors,
  clearMessages,
  likeSuccesslikes,
} from "../Store/Reducers/post";
import { getfollowingpost } from "../Actions/User";
import { Dialog } from "@mui/material";
import { AllLike } from "./AllLike";
import { AllComments } from "./AllComments";

export const Post = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isDelete = false,
  isAccount = false,
}) => {
  const [liked, setliked] = useState(false);
  const [alllikes, setlikes] = useState(false);
  const [allcomment, setallcomment] = useState(false);
  const [comment, setcomment] = useState("Add a new comment");
  const [changecaption, setchangecaption] = useState(false);
  const [newcaption, setcaption] = useState();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const {
    loading: captionloading,
    message: captionmessage,
    error: captionerror,
  } = useSelector((state) => state.changecaption);

  const handlelike = async () => {
    setliked(!liked);
    await dispatch(likepost(postId));
    if (isAccount) {
      await dispatch(getMyPosts());
    }
    await dispatch(getfollowingpost());
  };

  const handlechangecaption = () => {
    setchangecaption(!changecaption);
  };

  const handletotallike = () => {
    setlikes(!alllikes);
  };

  const handleallcomment = () => {
    setallcomment(!allcomment);
  };

  const handlecomment = async () => {
    if (comment) {
      await dispatch(commentonpost(postId, comment, user));
      await dispatch(getfollowingpost());
    }
  };

  const handlepostdelete = () => {
    dispatch(deletepost(postId));
  };

  const handlecaption = async () => {
    if (newcaption) {
      dispatch(updatecaption(postId, newcaption));
    }
  };

  useEffect(() => {
    likes.forEach((item) => {
      if (item._id === user._id) {
        setliked(true);
      }
    });
  }, [likes, user._id, comments]);

  return (
    <Main>
      <img src={`${postImage}`} alt="Post" />
      <PostDetail>
        <div className="icon">
          {liked ? (
            <FcLike onClick={handlelike} />
          ) : (
            <GoHeart onClick={handlelike} />
          )}
          <BiComment
            style={{ fontSize: "smaller" }}
            onClick={handleallcomment}
          />
          {isDelete ? <TbHttpDelete onClick={handlepostdelete} /> : null}
          {alllikes ? <AllLike users={likes} /> : <></>}
          {allcomment ? (
            <AllComments
              isAccount={isAccount}
              comments={comments}
              postId={postId}
            />
          ) : (
            <></>
          )}
        </div>
        <Link to={`/user/${ownerId}`}>
          <p
            style={{
              minWidth: "fit-content",
              fontWeight: "bold",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {ownerName}
          </p>
        </Link>
        <div style={{ fontStyle: "italic" }} className="caption">
          {caption}
        </div>
        <div
          className="likes"
          style={{ fontFamily: "Poppins" }}
          onClick={handletotallike}
        >
          {likes.length} LIKES
        </div>

        {isAccount ? (
          <Caption onClick={handlechangecaption}>
            <p>Change Caption</p>
          </Caption>
        ) : (
          <></>
        )}
      </PostDetail>
      {changecaption ? (
        <>
          <Comment>
            <div>
              <input
                type="text"
                placeholder="Add a new Caption"
                onChange={(e) => setcaption(e.target.value)}
              />
            </div>
            <button onClick={handlecaption}>Change</button>
          </Comment>
        </>
      ) : (
        <>
          <Comment>
            <div>
              <input
                type="text"
                placeholder={comment}
                onChange={(e) =>
                  e.target.value
                    ? setcomment(e.target.value)
                    : setcomment("Add a new Comment")
                }
              />
            </div>
            <button onClick={handlecomment}>Post</button>
          </Comment>
        </>
      )}
    </Main>
  );
};

const Main = styled.div`
  width: max-content;
  height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 12px;
  row-gap: 1vh;
  font-family: "Poppins", sans-serif;
  user-select: none;
  margin: 1vh 0;
  padding: 1vh;
  position: relative;
  background-size: cover;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  > img {
    height: 25rem;
    width: 50vw;
    border: 2px solid grey;
    border-radius: 8px;
    object-fit: contain;
    background-color: black;
    @media screen and (max-width: 800px) {
      width: 95%;
    }
  }
`;
const PostDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 97%;
  height: 40%;
  height: max-content;
  gap: 1vh;
  cursor: pointer;

  > a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: black;
    gap: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  > a > img {
    height: 3vmax;
    width: 3vmax;
    border-radius: 50%;
  }

  .icon {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 2rem;
  }
  .caption {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Comment = styled.div`
  max-height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  input {
    height: 20px;
    width: 40vw;
    background: transparent;
    border: none;
    border-bottom: 1px solid #000000;
    font-family: "Poppins", sans-serif;
  }
  input:focus {
    outline: none;
  }

  button {
    display: flex;
    align-items: center;
    width: 8vw;
    border-radius: 1rem;
    justify-content: center;
    background: #ffffff;
    font-family: "Poppins", sans-serif;
    font-size: 15px;
    cursor: pointer;
    border: 2px solid #00acdf;
    color: #00acdf;
  }
  button:hover {
    color: #ffffff;
    background: #00acdf;
  }
`;

const Caption = styled.div`
  align-self: flex-start;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  height: 5vh;
  width: 12vw;
  background-color: #00acdf;
  color: white;
  &:hover {
    color: #000000;
  }
`;
