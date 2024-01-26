import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Header } from "../Components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getMyPosts } from "../Actions/Post";
import { Post } from "../Components/Post";
import { Loader } from "../Components/Loader";
import { RxCross2 } from "react-icons/rx";
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
  const [show, setshow] = useState(undefined);
  const { user, loading, message, error, auth } = useSelector(
    (state) => state.user
  );
  const { posts, loading: postloading } = useSelector((state) => state.mypost);
  console.log(posts);

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
  const handleimage = (post) => {
    setshow(post);
  };
  useEffect(() => {
    dispatch(getMyPosts());
    // dispatch(loaduser());
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
          {!show ? (
            <></>
          ) : (
            <div
              style={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                position: "absolute",
                justifyContent: "center",
                alignItems: "center",
                backdropFilter: "blur(80px)",
              }}
            >
              <RxCross2
                onClick={() => handleimage(undefined)}
                style={{
                  position: "absolute",
                  marginLeft: "90%",
                  marginBottom: "40%",
                  fontSize: "30px",
                  cursor: "pointer",
                }}
              />
              <Post
                postId={show._id}
                caption={show.caption}
                postImage={show.image.url}
                likes={show.likes}
                comments={show.comments}
                ownerImage={user.avatar.url}
                ownerName={user.name}
                ownerId={user._id}
                isDelete={true}
                isAccount={true}
              />
            </div>
          )}
          <Head>
            <Header show={false} />
          </Head>
          <Down>
            <Top>
              <img src={user.avatar.url} alt={user.name}></img>
              <div className="detail">
                <p>
                  <span className="bold">{user.name}</span>
                  <button onClick={handleprofile}>Edit Profile</button>
                  <button onClick={handledeleteprofile}>Delete Profile</button>
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
                      <p>Posts</p>
                      <div className="post">
                        {posts.map((post, index) => {
                          return (
                            <>
                              <img
                                src={post.image.url}
                                key={index}
                                onClick={() => handleimage(post)}
                              />
                            </>
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
  align-items: center;
`;
const Head = styled.div`
  height: 100svh;
  width: 20svw;
`;
const Down = styled.div`
  height: 100svh;
  width: 80svw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Top = styled.div`
  height: 40svh;
  width: 80svw;
  display: flex;
  /* flex-direction: column; */
  justify-content: space-evenly;
  align-items: center;
  font-family: "Poppins";
  /* background-color: #00acdf; */
  /* clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%); */

  > img {
    height: 10svw;
    width: 10svw;
    object-fit: cover;
    border-radius: 50%;
    box-shadow: 0 29px 52px rgba(0, 0, 0, 0.4), 0 25px 16px rgba(0, 0, 0, 0.2);
  }
  .detail {
    height: fit-content;
    width: 50vw;
    display: flex;
    flex-direction: column;
    gap: 2vh;
    justify-content: center;

    > p {
      display: flex;
      width: 20vw;
      justify-content: space-between;
      align-items: center;

      button {
        height: 4vh;
        border-radius: 0.2rem;
        border: none;
        background-color: #f6f7f9;
        cursor: pointer;
        &:hover {
          background-color: #cbcdcf;
        }
      }
    }
  }
  .count {
    display: flex;
    width: 20vw;
    justify-content: space-between;
    font-size: small;
  }
  .bold {
    font-weight: bold;
    justify-self: flex-start;
  }
`;
const Bottom = styled.div`
  height: 90svh;
  width: 70svw;
  font-family: "Poppins";
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 2vh 0px;
  gap: 5vw;
  cursor: pointer;

  .post {
    display: flex;
    width: 70vw;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    img {
      height: 40vh;
      width: 40vh;
      border-radius: 1rem;
      object-fit: cover;
    }
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
