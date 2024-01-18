import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { changeprofile } from "../Actions/User";

export const UpdatePofile = () => {
  const [image, setimage] = useState(
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E"
  );
  const [email, setemail] = useState("");
  const [name, setname] = useState("");

  const dispatch = useDispatch();
  const handlenewavatar = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result;
        setimage(imageData);
      };
      reader.readAsDataURL(file);
    }
  };
  const handlechangeprofile = async () => {
    if (email || name || image) {
      dispatch(changeprofile(name, email, image));
    }
  };
  return (
    <Main>
      <div className="avatar">
        <label>
          <input type="file" value="" onChange={handlenewavatar} />
          <img src={image} alt="Default" />
        </label>
        <p>New Avatar</p>
      </div>
      <div className="cre">
        <p style={{ alignSelf: "flex-start", textIndent: "1vw" }}>Name</p>
        <input
          type="text"
          placeholder="Enter your name"
          onChange={(e) => setname(e.target.value)}
        />
      </div>
      <div className="cre">
        <p style={{ alignSelf: "flex-start", textIndent: "1vw" }}>Email</p>
        <input
          type="text"
          placeholder="Enter your email"
          onChange={(e) => setemail(e.target.value)}
        />
      </div>
      <button onClick={handlechangeprofile}>Change Profile</button>
    </Main>
  );
};

const Main = styled.div`
  height: 70vh;
  width: 30vw;
  position: absolute;
  border: 2px solid #00acdf;
  border-radius: 1rem;
  top: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font-family: "Poppins";
  user-select: none;
  justify-self: center;

  img {
    height: 20vh;
    border: 2px solid #00acdf;
    border-radius: 50%;
    cursor: pointer;
  }

  .avatar {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #00acdf;
    gap: 1vh;
    input {
      display: none;
    }
  }
  .cre {
    height: 10vh;
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    input {
      width: 90%;
      height: 4vh;
      border: 1px solid #00acdf;
      border-radius: 1rem;
      text-indent: 1rem;
      &:focus {
        outline: none;
      }
    }
  }

  button {
    height: 5vh;
    width: 10vw;
    background-color: #ffffff;
    color: #00acdf;
    border: 2px solid #00acdf;
    border-radius: 1rem;
    transition: ease-in-out 0.5s;
    cursor: pointer;
    &:hover {
      background-color: #00acdf;
      color: white;
    }
  }
`;
