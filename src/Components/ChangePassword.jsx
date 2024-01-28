import React from "react";
import styled from "styled-components";

export const ChangePassword = () => {
  return (
    <Main>
      <div>
        <div>
          <p>Old Password</p>
          <input type="text" />
        </div>
        <div>
          <p>New Password</p>
          <input type="text" />
        </div>

        <button>Submit</button>
      </div>
    </Main>
  );
};

const Main = styled.div`
  height: 100vh;
  width: 79vw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  > div {
    height: 50vh;
    width: 25vw;
    background-color: gray;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
`;
