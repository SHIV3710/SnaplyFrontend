import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Header } from "../Components/Header";
import { FaRegImage } from "react-icons/fa6";
import { BiPaperclip } from "react-icons/bi";
import { addPost } from "../Actions/Post";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../Components/Loader";
import { addPostclearMessages } from "../Store/Reducers/post";

export const CreatePost = () => {
  const dispatch = useDispatch();
  const [image, setimage] = useState(null);
  const [caption, setcaption] = useState("");
  const { loading, message } = useSelector((state) => state.addpost);
  const handleimagechange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result;
        console.log(imageData);
        setimage(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlecreatepost = async () => {
    if (image && caption) {
      dispatch(addPost(image, caption));
    }
  };

  useEffect(() => {
    if (message) {
      dispatch(addPostclearMessages());
    }
  }, [message]);

  return (
    <Main>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <Bottom>
            <Post>
              <div>
                {image != null ? (
                  <>
                    <img
                      style={{
                        height: "30vh",
                        width: "30vh",
                        borderRadius: "0.5rem",
                        objectFit: "contain",
                      }}
                      src={image}
                      alt="Your New Post"
                    />
                  </>
                ) : (
                  <p
                    style={{
                      fontWeight: "bold",
                      fontSize: "2rem",
                      backgroundColor: "#00acdf",
                      width: "20vw",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "1rem",
                    }}
                  >
                    Create Post
                  </p>
                )}
              </div>
              <div
                className="caption"
                style={{
                  color: "#00acdf",
                }}
              >
                Caption
                <textarea
                  placeholder="Add a caption to your post"
                  style={{
                    height: "25vh",
                    width: "30vw",
                    fontFamily: "Poppins",
                    borderRadius: "0.3rem",
                    textIndent: "10px",
                    background: "transparent",
                  }}
                  onChange={(e) => setcaption(e.target.value)}
                ></textarea>
              </div>
              <div className="button">
                <FaRegImage />
                <label>
                  <input type="file" value="" onChange={handleimagechange} />
                  <BiPaperclip />
                </label>
              </div>
              <button disabled={loading} onClick={handlecreatepost}>
                Post
              </button>
            </Post>
          </Bottom>
        </>
      )}
    </Main>
  );
};

const Main = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Bottom = styled.div`
  height: 90vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Post = styled.div`
  height: 70vh;
  width: 40vw;
  backdrop-filter: blur(45px);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-family: "Poppins";
  align-items: center;
  color: white;
  gap: 1vw;

  .caption {
    display: flex;
    flex-direction: column;
    font-weight: bold;
    gap: 1vh;
  }
  textarea:focus {
    outline: none;
  }

  .button {
    width: 75%;
    display: flex;
    gap: 1vw;
    font-size: 1.5rem;
    cursor: pointer;
    color: #00acdf;
  }
  label {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  input {
    display: none;
  }

  button {
    width: 10vw;
    background: transparent;
    border: none;
    font-family: "Poppins", sans-serif;
    color: black;
    cursor: pointer;
    height: 4vh;
    background-color: #00acdf;
    border-radius: 1rem;
  }
  button:hover {
    font-weight: bold;
  }
`;
