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
import { useDispatch, useSelector } from "react-redux";
import Logo from "../Resources/logo.png";
import { logoutuser } from "../Actions/User";
import { AiOutlineLogout } from "react-icons/ai";
import { setpath } from "../Store/Reducers/user";
import { CgArrowsExchange } from "react-icons/cg";
import { changeabsolute } from "../Store/Reducers/post";

export const Header = ({ show }) => {
  const dispatch = useDispatch();
  const { path } = useSelector((state) => state.user);
  const [account, setaccount] = useState(undefined);
  const { component } = useSelector((state) => state.Absolute);

  const setTab = async (tab) => {
    if (tab == "/search" || tab == "/newpost" || tab == "/changepassword") {
      if (component != tab) await dispatch(changeabsolute(tab));
      else await dispatch(changeabsolute(null));
    } else {
      await dispatch(changeabsolute(null));
      await dispatch(setpath(tab));
    }
  };

  const handlelogout = () => {
    dispatch(logoutuser());
  };
  return (
    <Main>
      <img src={Logo} alt="" />
      <div>
        <Link onClick={() => setTab("/")}>
          {path === "/" ? (
            <IoHome style={{ color: "black" }} />
          ) : (
            <IoHomeOutline />
          )}
          <span>Home</span>
        </Link>

        <Link onClick={() => setTab("/newpost")}>
          {path === "/newpost" ? (
            <IoIosAddCircle style={{ color: "black" }} />
          ) : (
            <IoIosAddCircleOutline />
          )}
          <span>Post</span>
        </Link>

        <Link onClick={() => setTab("/search")}>
          {path === "/search" ? (
            <IoSearchOutline style={{ color: "black" }} />
          ) : (
            <IoSearchOutline />
          )}
          <span>Search</span>
        </Link>

        <Link onClick={() => setTab("/account")}>
          {path === "/account" ? (
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
        <a
          onClick={() => {
            setaccount(!account);
          }}
        >
          <IoReorderThree />
          <span>More</span>
        </a>
      </div>
      {account ? (
        <div className="absolute">
          <a>
            <AiOutlineLogout onClick={handlelogout} />
            <span onClick={handlelogout}>Logout</span>
          </a>
          <a>
            <CgArrowsExchange onClick={() => setTab("/changepassword")} />
            <span onClick={() => setTab("/changepassword")}>
              Change Password
            </span>
          </a>
        </div>
      ) : (
        <></>
      )}
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
  background-color: white;
  z-index: 999;
  /* position: fixed; */
  @media screen and (max-width: 1200px) {
    width: 16vw;
  }
  @media screen and (max-width: 800px) {
    flex-direction: row;
    height: 10vh;
    width: 100vw;
    align-items: center;
    justify-content: space-around;
    border: none;
    border-bottom: 1px solid rgb(186, 183, 183);
  }

  > img {
    height: 120px;
    @media screen and (max-width: 1200px) {
      display: none;
    }
  }
  svg {
    font-size: x-large;
    @media screen and (max-width: 1200px) {
      font-size: x-large;
    }
  }

  div {
    padding-left: 2vw;
    height: 60vh;
    display: flex;
    flex-direction: column;
    gap: 5vh;
    @media screen and (max-width: 800px) {
      flex-direction: row;
      height: 5vh;
      width: 70vw;
      justify-content: space-around;
    }
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
    span {
      padding-left: 1.5vw;
      font-size: small;
      @media screen and (max-width: 800px) {
        display: none;
      }
    }
    @media screen and (max-width: 800px) {
      align-self: center;
    }
  }

  .absolute {
    display: flex;
    gap: 2vh;
    font-size: small;
    cursor: pointer;
    position: absolute;
    top: 80%;
    user-select: none;
    @media screen and (max-width: 800px) {
      width: fit-content;
      flex-direction: column;
      left: 80%;
      top: 85%;
      z-index: 999;
      svg {
        font-weight: bold;
        border-radius: 0.1rem;
      }
    }
  }
`;
