import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RxCross2 } from "react-icons/rx";
import { changeabsolute } from "../Store/Reducers/post";
import { RiEye2Line } from "react-icons/ri";
import { RiEyeCloseLine } from "react-icons/ri";
import { changepassword } from "../Actions/User";

export const ChangePassword = () => {
  const { component } = useSelector((state) => state.Absolute);
  const [oldp, setoldp] = useState(false);
  const [newp, setnewp] = useState(false);
  const [oldpassword, setoldpassword] = useState(undefined);
  const [newpassword, setnewpassword] = useState(undefined);
  const dispatch = useDispatch();

  const handlesubmit = async () => {
    if (oldpassword && newpassword) {
      dispatch(changepassword(oldpassword, newpassword));
    }
  };

  return (
    <Main
      style={{
        display: component === "/changepassword" ? "flex" : "none",
      }}
    >
      <div>
        <p>Change Password</p>
        <div style={{ position: "relative" }}>
          <p>Old Password</p>
          {!oldp ? (
            <RiEyeCloseLine
              onClick={() => {
                setoldp(!oldp);
              }}
              style={{
                position: "absolute",
                left: "90%",
                top: "50%",
                zIndex: "999",
                cursor: "pointer",
              }}
            />
          ) : (
            <RiEye2Line
              onClick={() => {
                setoldp(!oldp);
              }}
              style={{
                position: "absolute",
                left: "90%",
                top: "50%",
                cursor: "pointer",
              }}
            />
          )}
          <input
            type={oldp ? "text" : "password"}
            placeholder="Enter your old password"
            onChange={(e) => {
              setoldpassword(e.target.value);
            }}
          />
        </div>
        <div style={{ position: "relative" }}>
          <p>New Password</p>
          {!newp ? (
            <RiEyeCloseLine
              onClick={() => {
                setnewp(!newp);
              }}
              style={{
                position: "absolute",
                left: "90%",
                top: "50%",
                cursor: "pointer",
              }}
            />
          ) : (
            <RiEye2Line
              onClick={() => {
                setnewp(!newp);
              }}
              style={{
                position: "absolute",
                left: "90%",
                top: "50%",
                cursor: "pointer",
              }}
            />
          )}

          <input
            type={newp ? "text" : "password"}
            placeholder="Enter your new password"
            onChange={(e) => {
              setnewpassword(e.target.value);
            }}
          />
        </div>
        <button onClick={handlesubmit}> Submit</button>
      </div>
      <RxCross2
        onClick={() => dispatch(changeabsolute(null))}
        style={{
          position: "absolute",
          top: "5%",
          right: "5%",
          fontSize: "xx-large",
          color: "white",
          cursor: "pointer",
        }}
      />
    </Main>
  );
};

const Main = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgb(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 999;
  font-family: "Poppins";
  font-size: small;

  input {
    height: 5vh;
    width: 20vw;
    font-size: small;
    font-family: "Poppins";
    text-indent: 0.5rem;
    background-color: rgb(255, 255, 255, 0.3);
    border: 1px solid gray;
    border-radius: 0.4rem;
    @media screen and (max-width: 800px) {
      width: 50vw;
    }
    &:focus {
      outline: none;
    }
  }
  > div {
    height: 50vh;
    width: 25vw;
    border-radius: 1rem;
    background-color: rgb(255, 255, 255, 0.7);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    @media screen and (max-width: 800px) {
      width: 60vw;
    }
  }

  button {
    height: 4vh;
    width: 5vw;
    border-radius: 0.4rem;
    border: none;
    cursor: pointer;
    &:hover {
      background-color: rgb(3, 188, 255);
    }
    @media screen and (max-width: 800px) {
      width: 15vw;
    }
  }
`;
