import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { deletecomment } from "../Actions/Post";
import { MdDelete } from "react-icons/md";

export const CommentCard = ({ comm, isAccount, postId }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handledelete = async () => {
    await dispatch(deletecomment(postId, comm._id));
  };
  return (
    <Main>
      <div
        style={{ height: "max-content", marginLeft: "2vw" }}
        className="user"
      >
        <div className="usr">
          <img src={comm.user.avatar.url} />
          <p>{comm.user.name}</p>
          <p>:</p>
          <span>{comm.comment}</span>
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
    border-radius: 1rem;
    > svg {
      font-size: 30px;
      cursor: pointer;
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
      @media screen and (max-width: 800px) {
        font-size: x-small;
      }
    }

    img {
      height: 2rem;
      width: 2rem;
      border-radius: 50%;
      @media screen and (max-width: 800px) {
        height: 1rem;
        width: 1rem;
      }
    }
    p {
      font-weight: bold;
      @media screen and (max-width: 800px) {
        font-size: x-small;
      }
    }
  }
`;
