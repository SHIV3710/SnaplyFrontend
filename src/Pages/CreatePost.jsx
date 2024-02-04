import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaRegImage } from "react-icons/fa6";
import { BiPaperclip } from "react-icons/bi";
import { addPost } from "../Actions/Post";
import { useDispatch, useSelector } from "react-redux";
import { addPostclearMessages, changeabsolute } from "../Store/Reducers/post";
import { RxCross2 } from "react-icons/rx";

export const CreatePost = () => {
  const dispatch = useDispatch();
  const [image, setimage] = useState(undefined);
  const [caption, setcaption] = useState("");
  const { loading, message } = useSelector((state) => state.addpost);
  const { component } = useSelector((state) => state.Absolute);
  const handleimagechange = async (e) => {
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

  const handlecreatepost = async () => {
    if (image && caption) {
      await dispatch(addPost(image, caption));
      await dispatch(changeabsolute(null));
    }
  };

  useEffect(() => {
    if (message) {
      dispatch(addPostclearMessages());
    }
  }, [message]);

  return (
    <Main style={{ display: component === "/newpost" ? "flex" : "none" }}>
      <Bottom>
        <Post>
          <div>
            {image != null ? (
              <>
                <img src={image} alt="Your New Post" />
              </>
            ) : (
              <p>Create Post</p>
            )}
          </div>
          <div
            className="caption"
            style={{
              color: "#000000",
            }}
          >
            Caption
            <textarea
              placeholder="Add a caption to your post"
              style={{}}
              onChange={(e) => setcaption(e.target.value)}
            ></textarea>
            <div className="button">
              <FaRegImage />
              <label>
                <input type="file" value="" onChange={handleimagechange} />
                <BiPaperclip />
              </label>
            </div>
          </div>
          <button disabled={loading} onClick={handlecreatepost}>
            Post
          </button>
        </Post>
      </Bottom>
      <button onClick={() => dispatch(changeabsolute(null))}> Close</button>
    </Main>
  );
};

const Main = styled.div`
  height: 100vh;
  width: 100vw;
  align-items: center;
  align-self: center;
  justify-content: center;
  position: absolute;
  z-index: 999;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.5);
  > button {
    height: 4vh;
    width: 5vw;
    font-family: "Poppins";
    top: 90%;
    position: absolute;
    cursor: pointer;
    @media screen and (max-width: 800px) {
      width: 15vw;
      top: 76%;
      outline-style: none;
    }
  }
`;
const Bottom = styled.div`
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Post = styled.div`
  height: 70vh;
  width: 40vw;
  background-color: white;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-family: "Poppins";
  align-items: center;
  color: #000000;
  gap: 1vh;
  @media screen and (max-width: 800px) {
    width: 80vw;
    height: 50vh;
  }

  > div > img {
    height: 20vh;
    border-radius: 50%;
    object-fit: contain;
    @media screen and (max-width: 800px) {
      height: 10vh;
    }
  }

  > div > p {
    font-weight: bold;
    font-size: 2rem;
    color: #000000;
    width: 20vw;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
    @media screen and (max-width: 800px) {
      width: 60vw;
      font-size: 1.5rem;
    }
  }

  .caption {
    display: flex;
    flex-direction: column;
    font-weight: bold;
    gap: 1vh;
    color: white;
    @media screen and (max-width: 800px) {
      width: 70vw;
    }
  }
  textarea {
    height: 25vh;
    width: 30vw;
    font-family: Poppins;
    border-radius: 0.3rem;
    text-indent: 10px;
    background-color: transparent;
    resize: none;
    color: #000000;
    &:focus {
      outline: none;
    }
    @media screen and (max-width: 800px) {
      width: 70vw;
    }
  }

  .button {
    width: 75%;
    display: flex;
    gap: 1vw;
    font-size: 1.5rem;
    cursor: pointer;
    color: #000000;
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
    color: #ffffff;
    cursor: pointer;
    height: 4vh;
    background-color: #000000;
    border-radius: 1rem;
    @media screen and (max-width: 800px) {
      width: 15vw;
    }
  }
  button:hover {
    font-weight: bold;
  }
`;
