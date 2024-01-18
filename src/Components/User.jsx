import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  followuser,
  getAllusers,
  getfollowingpost,
  loaduser,
} from "../Actions/User";

export const User = ({ Id, name, avatar, follow }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.postoffollwing);

  const handlefollow = async () => {
    await dispatch(followuser(Id));
    await dispatch(getAllusers());
    await dispatch(getfollowingpost());
    await dispatch(loaduser());
  };

  return (
    <Main>
      <Link className="homeUser">
        <img src={avatar} alt={name} />
        <p>{name}</p>
      </Link>
      <button onClick={handlefollow}>{!follow ? "Follow" : "Followed"}</button>
    </Main>
  );
};

const Main = styled.div`
  height: 10vh;
  width: 25vw;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 2vh 0;
  border-radius: 10px;
  align-self: center;

  .homeUser {
    width: 95%;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: 20px;
    transition: 0.1s;
  }

  img {
    height: 2rem;
    width: 2rem;
    border-radius: 50%;
  }
  p {
    font-size: 1rem;
    text-decoration: none;
    color: black;
    font-family: "Poppins", sans-serif;
  }
  button {
    height: 2rem;
    width: 6rem;
    color: #00acdf;
    background-color: white;
    border: 2px solid #00acdf;
    border-radius: 1rem;
    cursor: pointer;
    &:hover {
      color: white;
      background-color: #00acdf;
    }
  }
`;
