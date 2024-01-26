import React, { useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { IoHome } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosAddCircle } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import { IoReorderThree } from "react-icons/io5";
import { TiSocialLastFm } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../Resources/logo.png";
import { logoutuser } from "../Actions/User";
import { AiOutlineLogout } from "react-icons/ai";

export const Header = ({ show }) => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState(window.location.pathname);
  const [account, setaccount] = useState(undefined);
  const handlelogout = () => {
    dispatch(logoutuser());
  };
  return (
    <Main>
      {show ? (
        <TiSocialLastFm />
      ) : (
        <>
          <img src={Logo} alt="" />
        </>
      )}
      <div>
        <Link to="/" onClick={() => setTab("/")}>
          {tab === "/" ? (
            <IoHome
              style={{ color: "black", padding: show ? "0px 10px" : "0px" }}
            />
          ) : (
            <IoHomeOutline style={{ padding: show ? "0px 10px" : "0px" }} />
          )}
          {show ? (
            <></>
          ) : (
            <>
              <span>Home</span>
            </>
          )}
        </Link>

        <Link to="/newpost" onClick={() => setTab("/newpost")}>
          {tab === "/newpost" ? (
            <IoIosAddCircle
              style={{ color: "black", padding: show ? "0px 10px" : "0px" }}
            />
          ) : (
            <IoIosAddCircleOutline
              style={{ padding: show ? "0px 10px" : "0px" }}
            />
          )}
          {show ? (
            <></>
          ) : (
            <>
              <span>Post</span>
            </>
          )}
        </Link>

        <Link to="/search" onClick={() => setTab("/search")}>
          {tab === "/search" ? (
            <IoSearchOutline
              style={{ color: "black", padding: show ? "0px 10px" : "0px" }}
            />
          ) : (
            <IoSearchOutline style={{ padding: show ? "0px 10px" : "0px" }} />
          )}
          {show ? (
            <></>
          ) : (
            <>
              <span>Search</span>
            </>
          )}
        </Link>

        <Link to="/account" onClick={() => setTab("/account")}>
          {tab === "/account" ? (
            <FaCircleUser
              style={{ color: "black", padding: show ? "0px 10px" : "0px" }}
            />
          ) : (
            <FaRegCircleUser
              style={{
                padding: show ? "0px 10px" : "0px",
              }}
            />
          )}
          {show ? (
            <></>
          ) : (
            <>
              <span>Profile</span>
            </>
          )}
        </Link>
      </div>
      {account ? (
        <div
          style={{
            height: "10vh",
            display: "flex",
            gap: "1vh",
            fontSize: "small",
            // alignItems: "center",
            cursor: "pointer",
          }}
        >
          <a>
            <AiOutlineLogout />
            <span onClick={handlelogout}>Logout</span>
          </a>
          <a>
            <IoReorderThree />
            <span>Change Password</span>
          </a>
        </div>
      ) : (
        <></>
      )}
      <a
        onClick={() => {
          setaccount(!account);
        }}
      >
        {show ? (
          <>
            <IoReorderThree />
          </>
        ) : (
          <>
            <IoReorderThree />
            <span>More</span>
          </>
        )}
      </a>
    </Main>
  );
};

const Main = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-right: 1px solid rgb(197, 195, 195);
  transition: 1s ease;

  > img {
    height: 20vh;
  }
  > svg {
    font-size: xxx-large;
  }

  div {
    height: 60vh;
    display: flex;
    flex-direction: column;
    gap: 5vh;
  }

  a {
    display: flex;
    align-items: flex-start;
    justify-content: start;
    text-decoration: none;
    color: black;
    font-family: "Poppins";
    &:hover {
      svg {
        font-size: 22px;
      }
    }

    svg {
      font-size: 20px;
      transition: 0.2s;
      color: gray;
    }
    > span {
      padding-left: 2vw;
    }
  }
  button {
    width: 90%;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1vw;
    font-size: large;
    svg {
      font-size: xx-large;
      &:focus {
        color: black;
      }
    }
    cursor: pointer;
    color: gray;
  }
`;
