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
  const [show, setshow] = useState(false);

  const handlefollow = async () => {
    await dispatch(followuser(Id));
    await dispatch(getAllusers());
    await dispatch(getfollowingpost());
    await dispatch(loaduser());
  };

  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (Id === user._id) {
      setshow(true);
    }
  }, []);

  return (
    <Main>
      <Link className="homeUser">
        <img src={avatar} alt={name} />
        <p>{name}</p>
      </Link>
      {show ? (
        <></>
      ) : (
        <>
          <button onClick={handlefollow}>
            {!follow ? "Follow" : "Followed"}
          </button>
        </>
      )}
    </Main>
  );
};

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 2vh 0;
  border-radius: 10px;
  align-self: center;
  flex-wrap: wrap;

  .homeUser {
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: 20px;
    transition: 0.1s;
    @media screen and (max-width: 800px) {
      width: 10vw;
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
    font-size: small;
    text-decoration: none;
    color: black;
    font-family: "Poppins", sans-serif;
    @media screen and (max-width: 800px) {
      font-size: xx-small;
    }
  }
  button {
    height: 2rem;
    width: 6rem;
    color: #00acdf;
    background-color: white;
    border: none;
    border-radius: 1rem;
    font-size: small;
    cursor: pointer;
    @media screen and (max-width: 800px) {
      height: 1rem;
      width: 3rem;
      font-size: xx-small;
    }
    &:hover {
      color: #000000;
    }
  }
`;
