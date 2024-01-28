import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Image from "../Pictures/login-back2.jpg";
import { LuLogIn } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { Signup } from "./Signup";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import { RiEye2Line } from "react-icons/ri";
import { RiEyeCloseLine } from "react-icons/ri";
import axios from "axios";
import sky from "../Pictures/sky.jpg";
import { useDispatch, useSelector } from "react-redux";
import { loginuser } from "../Actions/User";
import { clearErrors, clearMessages } from "../Store/Reducers/post";
import { userClearErrors, userClearMessages } from "../Store/Reducers/user";

export const Login = () => {
  const [show, setshow] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, message, error } = useSelector((state) => state.user);

  const handlesubmit = async () => {
    if (email && password) {
      dispatch(loginuser(email, password));
    }
  };
  const handleshow = () => {
    setshow(!show);
  };

  return (
    <Container>
      <Left>
        <div className="l2">
          <h1>SnAplY</h1>
        </div>
      </Left>
      <Right>
        <Rightmain>
          <h2>Sign In</h2>
          <p>Sign in to your account</p>
          <div className="signin"></div>
          <Credential>
            <p>Email address</p>
            <div className="ip">
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => setemail(e.target.value)}
                value={email}
                required
              />
            </div>
            <p>Password</p>
            <div className="ipe">
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => setpassword(e.target.value)}
                value={password}
                required
              />
              <div className="eye">
                {show ? (
                  <RiEye2Line onClick={handleshow} />
                ) : (
                  <RiEyeCloseLine onClick={handleshow} />
                )}
              </div>
            </div>

            <h1>Forget password?</h1>

            <button className="SIGNIN" onClick={handlesubmit}>
              Sign In
            </button>
          </Credential>
          <div className="register">
            Don't have an account?{" "}
            <Link to="/signup">
              <span>Register here </span>{" "}
            </Link>
          </div>
        </Rightmain>
      </Right>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  width: 100vw;
  @media (max-width: 1300px) {
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    background: url(${sky});
  }
`;

const Left = styled.div`
  width: 50vw;
  background: #00acdf;
  /* clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%); */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Poppins", sans-serif;
  @media (min-width: 1301px) {
    clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%);
  }
  @media (max-width: 1300px) {
    background: transparent;
    height: 15vh;
  }

  .l2 {
    text-align: center;
    font-size: 75px;
    color: white;
    padding-right: 70px;
    @media (max-width: 1300px) {
      font-size: 3rem;
      color: black;
      background-color: transparent;
      text-align: center;
      padding-right: 0px;
    }
  }

  .l3 ul {
    display: flex;
    justify-content: space-around;
    width: 15rem;
    list-style: none;
    margin-bottom: 5vh;
  }

  .l3 svg {
    cursor: pointer;
    font-size: 5vh;
    color: white;
  }
  .l3 svg:hover {
    color: rgb(0, 0, 0);
  }
`;

const Right = styled.div`
  width: 50vw;
  display: flex;
  justify-content: center;
  background-color: white;
  @media (max-width: 1300px) {
    height: 80vh;
    border-radius: 1rem;
    /* width: 90vw; */
  }
  @media (max-width: 700px) {
    height: 80vh;
    border-radius: 1rem;
    width: 90vw;
  }
`;

const Credential = styled.div`
  height: 50vh;
  border-radius: 4vh;
  display: flex;
  flex-direction: column;
  background-color: transparent;
  text-align: left;
  font-family: "Poppins", sans-serif;
  justify-content: space-evenly;
  font-size: 20px;
  font-weight: bold;
  @media (max-width: 1300px) {
    /* font-size: smaller; */
  }

  .ip {
    height: 7vh;
    border-radius: 1vh;
    background-color: rgba(245, 245, 245, 1);
    margin-bottom: 1rem;
    padding-left: 1rem;
    font-size: 15px;
    font-family: "Poppins", sans-serif;
    display: flex;
    align-items: center;
  }
  input {
    width: 100%;
    border: none;
    background-color: transparent;
    font-family: "Poppins", sans-serif;
    @media (max-width: 1300px) {
      font-size: 15px;
    }
  }
  input:focus {
    outline: none;
  }

  .ipe {
    height: 7vh;
    /* border: 1px solid black; */
    border-radius: 1vh;
    background-color: rgba(245, 245, 245, 1);
    margin-bottom: 1rem;
    padding-left: 1rem;
    font-size: 15px;
    font-family: "Poppins", sans-serif;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  h1 {
    color: #00acdf;
    font-size: 1rem;
    font-weight: normal;
  }

  .eye {
    cursor: pointer;
    margin-right: 5px;
    font-size: 1.5rem;
  }

  .SIGNIN {
    display: flex;
    width: 100%;
    height: 6vh;
    justify-content: space-evenly;
    align-items: center;
    background-color: #00acdf;
    color: white;
    border-radius: 1rem;
    cursor: pointer;
    border: none;
    &:hover {
      background-color: #eebc5f;
      color: black;
    }
  }
`;

const Rightmain = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: "Poppins", sans-serif;

  h2 {
    margin: 0;
    margin-bottom: 1rem;
  }

  p {
    margin: 0;
    margin-bottom: 1rem;
  }

  .signin {
    width: 27vw;
    display: flex;
    margin-bottom: 1rem;
    justify-content: space-between;
  }

  .register {
    cursor: pointer;
    text-align: center;
    color: grey;
    a {
      text-decoration: none;
    }
    span {
      color: #00acdf;
    }
  }
`;

export default Login;
