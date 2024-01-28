import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Header } from "../Components/Header";
import { useDispatch, useSelector } from "react-redux";
import { anyuser, getAllusers, loaduser } from "../Actions/User";
import { User } from "../Components/User";
import { useNavigate } from "react-router-dom";
import { setpath } from "../Store/Reducers/user";

export const Search = () => {
  const [user, setuser] = useState([]);
  const [val, setvalue] = useState("");
  const [seeuser, setseeuser] = useState(null);
  const { users } = useSelector((state) => state.allUsers);
  const { user: usr } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const check = (user) => {
    let len = user.followers.length;
    for (let i = 0; i < len; i++) {
      if (user.followers[i] == usr._id) return false;
    }
    return true;
  };

  const handleseeuser = async (user) => {
    await dispatch(anyuser(user._id));
    await dispatch(setpath("/seeuser"));
  };

  const handlesearch = (value) => {
    let arr = [];
    for (let i = 0; i < users.length; i++) {
      let name = users[i].name;
      if (value.toLowerCase() === name.toLowerCase()) {
        arr.push(users[i]);
      }
      setuser(arr);
      setvalue(value);
    }
  };

  return (
    <Main>
      <Bottom>
        <Left>
          <p>Search any user</p>
          <input
            type="text"
            placeholder="Search someone"
            onChange={(e) => handlesearch(e.target.value)}
          />
          <Win>
            {user && user.length > 0 ? (
              user.map((user, index) => (
                <div key={index} onClick={() => handleseeuser(user)}>
                  {user._id !== usr._id && check(user) ? (
                    <User
                      Id={user._id}
                      name={user.name}
                      key={index}
                      avatar={user.avatar.url}
                      follow={false}
                    />
                  ) : !check(user) ? (
                    <User
                      Id={user._id}
                      name={user.name}
                      key={index}
                      avatar={user.avatar.url}
                      follow={true}
                    />
                  ) : null}
                </div>
              ))
            ) : (
              <></>
            )}
          </Win>
        </Left>
        <Right></Right>
      </Bottom>
    </Main>
  );
};

const Main = styled.div`
  height: 100vh;
  width: 70vw;
  display: flex;
`;

const Bottom = styled.div`
  height: 100vh;
  width: 70vw;
  display: flex;
`;

const Left = styled.div`
  height: 90vh;
  width: 30vw;
  display: flex;
  flex-direction: column;
  gap: 5vh;
  align-items: center;
  font-family: "Poppins";

  > p {
    margin-top: 5vh;
    font-size: x-large;
    color: #000000;
  }

  input {
    height: 5vh;
    border: 2px solid #000000;
    width: 25vw;
    border-radius: 0.5rem;
    text-indent: 1vw;
    font-family: "Poppins";

    &:focus {
      outline: none;
    }
  }
`;

const Win = styled.div`
  position: absolute;
  top: 35%;
  border-radius: 1rem;
  width: 25vw;
  height: 40vh;
  /* background-color: black; */
`;

const Right = styled.div`
  height: 90vh;
  width: 70vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5vh;

  > div {
    height: 90%;
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5vh;
    border: 2px solid #000000;
    border-radius: 1rem;
    justify-content: center;
    font-family: "Poppins";

    img {
      height: 10vw;
      width: 10vw;
      border-radius: 50%;
      border: 5px solid #00acdf;
    }

    p {
      width: max-content;
      text-align: start;
      color: #00acdf;
    }

    button {
      width: 5vw;
      height: 5vh;
      border: 2px solid #00acdf;
      background: #00acdf;
      color: #ffffff;
      border-radius: 1rem;

      &:hover {
        background-color: #f8b14df6;
        color: black;
        cursor: pointer;
      }
    }
  }
`;
