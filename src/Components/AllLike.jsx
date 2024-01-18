import React from "react";
import styled from "styled-components";
import { User } from "./User";

export const AllLike = (users) => {
  return (
    <Main>
      <div className="content">Likes</div>
      <div className="likes">
        {users.users.map((user, index) => {
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
  background-color: white;
  left: 30%;
  top: 10%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: center;

  .likes {
    ::-webkit-scrollbar {
      display: none;
    }
    display: flex;
    flex-direction: column;
    gap: 2vh;
    padding-top: 1vh;
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
  .usr {
    display: flex;
    align-items: center;
    gap: 1vh;
    font-size: 15px;
    overflow: hidden;
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
  }
`;
