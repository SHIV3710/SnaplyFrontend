import React from "react";
import styled from "styled-components";
import { User } from "./User";
import { useDispatch, useSelector } from "react-redux";
import { deletecomment, getMyPosts } from "../Actions/Post";
import { getfollowingpost } from "../Actions/User";
import { MdDelete } from "react-icons/md";
import { deletecommentclearErrors } from "../Store/Reducers/post";

export const CommentCard = ({ comm, isAccount, postId }) => {
  console.log(comm._id);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handledelete = async () => {
    await dispatch(deletecomment(postId, comm._id));
    await dispatch(getfollowingpost());
  };
  return (
    <Main>
      <div
        style={{ height: "max-content", marginLeft: "2vw" }}
        className="user"
      >
        <div className="usr">
          <img src={comm.user.avatar.url} />
          <p>{comm.user.name}</p>:<span>{comm.comment}</span>
        </div>
        {isAccount || comm.user._id === user._id ? (
          <MdDelete onClick={handledelete} style={{ color: "red" }} />
        ) : (
          <></>
        )}
      </div>
    </Main>
  );
};

const Main = styled.div`
  .user {
    width: 95%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > svg {
      font-size: 30px;
    }
  }

  .usr {
    display: flex;
    align-items: center;
    gap: 1vh;
    font-size: 15px;
    overflow: hidden;
    max-width: 90%;
    > span {
      max-width: 60%;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    img {
      height: 2rem;
      width: 2rem;
      border-radius: 50%;
    }
    p {
      font-weight: bold;
    }
  }
`;
