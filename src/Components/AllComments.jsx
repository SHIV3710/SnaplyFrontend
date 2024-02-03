import React from "react";
import styled from "styled-components";
import { RxCross2 } from "react-icons/rx";
import { CommentCard } from "./CommentCard";

export const AllComments = ({ comments, isAccount, postId, func }) => {
  let comment = comments;
  return (
    <Main>
      <Bottom>
        <div className="content">
          <span>Comments</span>
          <RxCross2 onClick={() => func()} />
        </div>
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
      </Bottom>
    </Main>
  );
};
const Main = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 12px;
  top: -0%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Bottom = styled.div`
  height: 70%;
  width: 80%;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  gap: 1vh;
  @media screen and (max-width: 800px) {
    align-self: center;
  }

  span {
    @media screen and (max-width: 800px) {
      font-size: small;
    }
  }

  svg {
    position: absolute;
    left: 85%;
    top: 18%;
    cursor: pointer;
    @media screen and (max-width: 800px) {
      left: 82%;
      top: 16%;
    }
  }

  .content {
    height: 10%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Poppins", sans-serif;
    font-weight: bold;
    font-size: x-large;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  .comment {
    display: flex;
    width: 95%;
    flex-direction: column;
    gap: 2vh;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
