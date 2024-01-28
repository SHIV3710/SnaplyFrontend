import React from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { CommentCard } from "./CommentCard";

export const AllComments = ({ comments, isAccount, postId }) => {
  let comment = comments;
  return (
    <Main>
      <div className="content">Comments</div>
      <div className="comment">
        {comment.map((comm, index) => {
          return (
            <CommentCard
              comm={comm}
              isAccount={isAccount}
              key={index}
              postId={postId}
            />
          );
        })}
      </div>
    </Main>
  );
};
const Main = styled.div`
  height: 50%;
  width: 90%;
  position: absolute;
  border-radius: 10px;
  background-color: white;
  left: 5%;
  top: 10%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  .content {
    height: 20%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Poppins", sans-serif;
    font-weight: bold;
    font-size: x-large;
  }
  .comment {
    display: flex;
    flex-direction: column;
    gap: 2vh;
  }
`;
