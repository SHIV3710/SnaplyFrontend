import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Header } from "../Components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getMyPosts } from "../Actions/Post";
import { Post } from "../Components/Post";
import { Loader } from "../Components/Loader";
import {
  addPostclearErrors,
  addPostclearMessages,
  addcommentclearErrors,
  addcommentclearMessages,
  changeCaptionclearErrors,
  changeCaptionclearMessages,
  clearErrors,
  clearMessages,
  deletecommentclearErrors,
  deletecommentclearMessages,
} from "../Store/Reducers/post";
import {
  changepassowrd,
  deleteProfile,
  loaduser,
  logoutuser,
} from "../Actions/User";
import { useNavigate } from "react-router-dom";
import { UpdatePofile } from "../Components/UpdatePofile";

export const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, message, error, auth } = useSelector(
    (state) => state.user
  );
  const { posts, loading: postloading } = useSelector((state) => state.mypost);

  const {
    loading: likeloading,
    message: likemessage,
    error: likeerror,
  } = useSelector((state) => state.like);

  const {
    loading: deleteloading,
    message: deletemessage,
    error: deleteerror,
  } = useSelector((state) => state.deletecomment);

  const {
    loading: addloading,
    message: addmessage,
    error: adderror,
  } = useSelector((state) => state.addcomment);
  const {
    loading: addpostloading,
    message: addpostmessage,
    error: addposterror,
  } = useSelector((state) => state.addpost);

  const {
    loading: captionloading,
    message: captionmessage,
    error: captionerror,
  } = useSelector((state) => state.changecaption);

  const [old, setold] = useState("");
  const [newpass, setnewpass] = useState("");
  const [showcontent, setshowcontent] = useState("0");

  const handlelogout = async () => {
    await dispatch(logoutuser());
  };
  const handlechangepassword = async () => {
    if (old && newpass) {
      dispatch(changepassowrd(old, newpass));
    }
  };
  const handlechange = () => {
    if (showcontent == "0" || showcontent == "2") {
      setshowcontent("1");
    } else {
      setshowcontent("0");
    }
  };

  const handleprofile = () => {
    if (showcontent == "0" || showcontent == "1") {
      setshowcontent("2");
    } else {
      setshowcontent("0");
    }
  };

  const handledeleteprofile = async () => {
    dispatch(deleteProfile());
  };
  useEffect(() => {
    dispatch(getMyPosts());
    dispatch(loaduser());
    if (addmessage) {
      dispatch(addcommentclearMessages());
    }
    if (adderror) {
      dispatch(addcommentclearErrors());
    }
    if (deletemessage) {
      dispatch(deletecommentclearMessages());
    }
    if (deleteerror) {
      dispatch(deletecommentclearErrors());
    }
    if (likemessage) {
      dispatch(clearMessages());
    }
    if (likeerror) {
      dispatch(clearErrors());
    }
    if (addpostmessage) {
      dispatch(addPostclearMessages());
    }
    if (addposterror) {
      dispatch(addPostclearErrors());
    }
    if (captionmessage) {
      dispatch(changeCaptionclearMessages());
    }
    if (captionerror) {
      dispatch(changeCaptionclearErrors());
    }
    if (message) {
      dispatch(clearMessages());
    }
    if (error) {
      dispatch(clearErrors());
    }
  }, [
    addmessage,
    adderror,
    deletemessage,
    deleteerror,
    likeerror,
    likemessage,
    addposterror,
    addpostmessage,
    captionmessage,
    captionerror,
    message,
    error,
    auth,
  ]);
  return (
    <Main>
      {postloading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <Down>
            <Top>
              <img src={user.avatar.url} alt={user.name}></img>
              <div className="detail">
                <p>
                  <span className="bold">{user.name}</span>
                </p>
                <div className="count">
                  <span>
                    <span className="bold">{user.followers.length}</span>{" "}
                    Followers
                  </span>
                  <span>
                    <span className="bold">{user.following.length}</span>{" "}
                    Following
                  </span>
                  <span>
                    <span className="bold">{user.posts.length}</span> Posts
                  </span>
                </div>
              </div>
              <button onClick={handlelogout}>Log Out</button>
              <button onClick={handlechange}>Change Password</button>
              <button onClick={handleprofile}>Update Profile</button>
              <button onClick={handledeleteprofile}>Delete Profile</button>
            </Top>
            <Bottom>
              {showcontent == "1" ? (
                <>
                  <ChangePassword onClick={handlechangepassword}>
                    <p
                      style={{
                        fontWeight: "bold",
                        fontSize: "x-large",
                        color: "#00acdf",
                      }}
                    >
                      Change your Password
                    </p>
                    <div>
                      <p style={{ color: "#00acdf" }}>Old Password</p>
                      <input
                        type="password"
                        placeholder="Old Password"
                        onChange={(e) => setold(e.target.value)}
                      />
                    </div>
                    <div>
                      <p style={{ color: "#00acdf" }}>New Password</p>
                      <input
                        type="password"
                        placeholder="New Password"
                        onChange={(e) => setnewpass(e.target.value)}
                      />
                    </div>
                    <button>Change Password</button>
                  </ChangePassword>
                </>
              ) : (
                <>
                  {showcontent == "2" ? (
                    <UpdatePofile />
                  ) : (
                    <>
                      <div style={{ fontWeight: "bold" }}>Posts</div>
                      <div className="post">
                        {posts.map((post, index) => {
                          return (
                            <Post
                              key={index}
                              postId={post._id}
                              caption={post.caption}
                              postImage={post.image.url}
                              likes={post.likes}
                              comments={post.comments}
                              ownerImage={user.avatar.url}
                              ownerName={user.name}
                              ownerId={user._id}
                              isDelete={true}
                              isAccount={true}
                            />
                          );
                        })}
                      </div>
                    </>
                  )}
                </>
              )}
            </Bottom>
          </Down>
        </>
      )}
    </Main>
  );
};

const Main = styled.div`
  height: 100svh;
  width: 100svw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Down = styled.div`
  height: 90svh;
  width: 100svw;
  display: flex;
  justify-content: space-around;
`;

const Top = styled.div`
  height: 90svh;
  width: 50svw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-family: "Poppins";
  background-color: #00acdf;
  clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%);

  > img {
    height: 10svw;
    width: 10svw;
    object-fit: cover;
    border-radius: 50%;
    box-shadow: 0 29px 52px rgba(0, 0, 0, 0.4), 0 25px 16px rgba(0, 0, 0, 0.2);
  }
  .detail {
    height: fit-content;
    width: 20vw;
    display: flex;
    flex-direction: column;
    gap: 2vh;
    justify-content: center;
    align-items: center;
  }
  .count {
    display: flex;
    flex-direction: column;
    gap: 1vw;
  }
  .bold {
    font-weight: bold;
    justify-self: flex-start;
  }

  button {
    border: none;
    height: 5vh;
    width: 10vw;
    width: calc(max-content);
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Poppins";
    cursor: pointer;
    color: #00acdf;
  }
  button:hover {
    background-color: #e7b65a;
    color: white;
  }
`;
const Bottom = styled.div`
  height: 90svh;
  width: 70svw;
  font-family: "Poppins";
  display: flex;
  align-items: center;
  flex-direction: column;
  /* justify-content: center; */
  overflow: scroll;
  gap: 5vw;

  .post {
    display: flex;
    flex-direction: column;
    flex-wrap: no-wrap;
    justify-content: center;
  }
`;
const ChangePassword = styled.div`
  position: absolute;
  height: 60vh;
  width: 30vw;
  top: 25%;
  background-color: white;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border: 1px solid #00acdf;

  input {
    height: 5vh;
    width: 25vw;
    background: transparent;
    border: none;
    border-bottom: 1px solid #000000;
    font-family: "Poppins", sans-serif;
  }
  input:focus {
    outline: none;
  }

  button {
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
