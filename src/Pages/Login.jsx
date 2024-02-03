import React, { useState } from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { RiEye2Line, RiEyeCloseLine } from "react-icons/ri";
import sky from "../Pictures/sky.jpg";
import { useDispatch } from "react-redux";
import { loginuser } from "../Actions/User";

export const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (email && password) {
      dispatch(loginuser(email, password));
    }
  };

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <Container>
      <Left>
        <Logo>
          <h1>SnAplY</h1>
        </Logo>
      </Left>
      <Right>
        <RightMain>
          <h2>Sign In</h2>
          <p>Sign in to your account</p>
          <Divider />
          <Credentials>
            <label>Email address</label>
            <InputContainer>
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </InputContainer>
            <label>Password</label>
            <PasswordInputContainer>
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <div className="eye" onClick={handleShow}>
                {show ? <RiEye2Line /> : <RiEyeCloseLine />}
              </div>
            </PasswordInputContainer>

            <ForgotPassword>Forgot password?</ForgotPassword>

            <SignInButton onClick={handleSubmit}>Sign In</SignInButton>
          </Credentials>
          <RegisterText>
            Don't have an account?{" "}
            <Link to="/signup">
              <span>Register here </span>{" "}
            </Link>
          </RegisterText>
        </RightMain>
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
`;

const Logo = styled.div`
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
`;

const Right = styled.div`
  width: 50vw;
  display: flex;
  justify-content: center;
  background-color: white;

  @media (max-width: 1300px) {
    height: 80vh;
    border-radius: 1rem;
  }

  @media (max-width: 700px) {
    height: 80vh;
    border-radius: 1rem;
    width: 90vw;
  }
`;

const RightMain = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: "Poppins", sans-serif;

  h2,
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
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ddd;
  margin-bottom: 1rem;
`;

const Credentials = styled.div`
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
`;

const InputContainer = styled.div`
  height: 7vh;
  border-radius: 1vh;
  background-color: rgba(245, 245, 245, 1);
  margin-bottom: 1rem;
  padding-left: 1rem;
  font-size: 15px;
  font-family: "Poppins", sans-serif;
  display: flex;
  align-items: center;

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
`;

const PasswordInputContainer = styled(InputContainer)`
  .eye {
    cursor: pointer;
    margin-right: 5px;
    font-size: 1.5rem;

    svg {
      outline: none;
    }
  }
`;

const ForgotPassword = styled.h1`
  color: #00acdf;
  font-size: 1rem;
  font-weight: normal;
`;

const SignInButton = styled.button`
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
`;

const RegisterText = styled.div`
  cursor: pointer;
  text-align: center;
  color: grey;

  a {
    text-decoration: none;
  }

  span {
    color: #00acdf;
  }
`;

export default Login;
