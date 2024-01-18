import React, { useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { FcHome } from "react-icons/fc";
import { IoHome } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosAddCircle } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
export const Header = () => {
  const [tab, setTab] = useState(window.location.pathname);
  return (
    <Main>
      <Link to="/" onClick={() => setTab("/")}>
        {tab === "/" ? (
          <IoHome style={{ color: "black" }} />
        ) : (
          <IoHomeOutline />
        )}
      </Link>

      <Link to="/newpost" onClick={() => setTab("/newpost")}>
        {tab === "/newpost" ? (
          <IoIosAddCircle style={{ color: "black" }} />
        ) : (
          <IoIosAddCircleOutline />
        )}
      </Link>

      <Link to="/search" onClick={() => setTab("/search")}>
        {tab === "/search" ? (
          <IoSearchOutline style={{ color: "black" }} />
        ) : (
          <IoSearchOutline />
        )}
      </Link>

      <Link to="/account" onClick={() => setTab("/account")}>
        {tab === "/account" ? (
          <FaRegCircleUser style={{ color: "black" }} />
        ) : (
          <FaCircleUser />
        )}
      </Link>
    </Main>
  );
};

const Main = styled.div`
  display: flex;
  width: 100vw;
  justify-content: center;
  align-items: center;
  height: 10vh;
  background-color: #00acdf;

  a {
    width: 2vmax;
    height: 2vmax;
    margin: 1vmax 4vmax;
  }

  a > svg {
    font-size: 2vmax;
    transition: all 0.5s;
    color: rgba(0, 0, 0, 0.445);
  }

  a > svg:hover {
    color: black;
    transform: scale(1.2);
  }

  @media screen and (max-width: 600px) {
    a {
      width: 8vw;
      height: 8vw;
      margin: 2vw 8vw;
    }
    a > svg {
      font-size: 8vw;
    }
  }
`;
