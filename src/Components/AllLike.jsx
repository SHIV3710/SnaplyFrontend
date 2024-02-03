import React from "react";
import styled from "styled-components";
import { RxCross2 } from "react-icons/rx";
import { User } from "./User";

export const AllLike = ({ users, func }) => {
  return (
    <Main>
      <div className="content">
        Likes <RxCross2 onClick={() => func()} />
      </div>

      <div className="likes">
        {users.map((user, index) => {
          return (
            <div className="usr">
              <img src={user.avatar.url} />
              <p>{user.name}</p>
            </div>
          );
        })}
      </div>
    </Main>
  );
};
const Main = styled.div`
  height: 50%;
  width: 50%;
  position: absolute;
  border-radius: 10px;
  background-color: rgb(255, 255, 255, 0.8);
  left: 30%;
  top: 10%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  @media screen and (max-width: 800px) {
    height: 80%;
    width: 70%;
    left: 15%;
    top: 10%;
  }

  svg {
    position: absolute;
    left: 90%;
    top: 5%;
    cursor: pointer;
  }

  .likes {
    ::-webkit-scrollbar {
      display: none;
    }
    display: flex;
    flex-direction: column;
    gap: 2vh;
    cursor: pointer;
    padding-top: 1vh;
    .usr {
      display: flex;
      gap: 1vw;
      margin-left: 1vw;
      align-items: center;
      > img {
        height: 2rem;
        width: 2rem;
        border-radius: 50%;
      }
    }
  }
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
`;
