import React, { useEffect, useState } from "react";
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
import { useDispatch } from "react-redux";
import Logo from "../Resources/logo.png";
import { logoutuser } from "../Actions/User";
import { AiOutlineLogout } from "react-icons/ai";
import { setpath } from "../Store/Reducers/user";
import { CgArrowsExchange } from "react-icons/cg";

export const Header = ({ show }) => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState(window.location.pathname);
  const [account, setaccount] = useState(undefined);

  useEffect(() => {
    dispatch(setpath(tab));
  }, [tab]);
  const handlelogout = () => {
    dispatch(logoutuser());
  };
  return (
    <Main>
      <img src={Logo} alt="" />
      <div>
        <Link onClick={() => setTab("/")}>
          {tab === "/" ? (
            <IoHome style={{ color: "black" }} />
          ) : (
            <IoHomeOutline />
          )}
          <span>Home</span>
        </Link>

        <Link onClick={() => setTab("/newpost")}>
          {tab === "/newpost" ? (
            <IoIosAddCircle style={{ color: "black" }} />
          ) : (
            <IoIosAddCircleOutline />
          )}
          <span>Post</span>
        </Link>

        <Link onClick={() => setTab("/search")}>
          {tab === "/search" ? (
            <IoSearchOutline style={{ color: "black" }} />
          ) : (
            <IoSearchOutline />
          )}
          <span>Search</span>
        </Link>

        <Link onClick={() => setTab("/account")}>
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
            height: "fit-content",
            display: "flex",
            gap: "2vh",
            fontSize: "small",
            cursor: "pointer",
            position: "absolute",
            top: "80%",
            cursor: "pointer",
          }}
        >
          <a>
            <AiOutlineLogout />
            <span onClick={handlelogout}>Logout</span>
          </a>
          <a>
            <CgArrowsExchange />
            <span onClick={() => setTab("/changepassword")}>
              Change Password
            </span>
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
        <IoReorderThree />
        <span>More</span>
      </a>
    </Main>
  );
};

const Main = styled.div`
  height: 100vh;
  width: 14vw;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: self-start;
  border-right: 1px solid rgb(186, 183, 183);
  transition: 1s ease;
  padding-left: 2vw;

  > img {
    height: 16vh;
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
    cursor: pointer;
    color: black;
    font-family: "Poppins";
    &:hover {
      svg {
        font-size: 25px;
      }
    }

    svg {
      font-size: 24px;
      transition: 0.2s;
      color: #000000;
    }
    span {
      padding-left: 1.5vw;
    }
  }
`;
