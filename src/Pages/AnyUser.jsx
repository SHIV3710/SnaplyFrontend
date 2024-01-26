import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Header } from "../Components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getMyPosts } from "../Actions/Post";
import { Post } from "../Components/Post";
import { Loader } from "../Components/Loader";
import { RxCross2 } from "react-icons/rx";
import { useLocation, useNavigate } from "react-router-dom";
import { UpdatePofile } from "../Components/UpdatePofile";
import { anyuser, followuser } from "../Actions/User";
export const AnyUser = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const [show, setshow] = useState(undefined);
  const { seeuser, user } = useSelector((state) => state.user);
  const [follow, setfollow] = useState(false);
  console.log(state.user);

  useEffect(() => {
    dispatch(anyuser(state.user._id));
  }, [dispatch]);

  const handleimage = (value) => {
    setshow(value);
  };

  const handlefollow = () => {
    dispatch(followuser(seeuser._id));
    dispatch(anyuser(state.user._id));
    setfollow(!follow);
  };

  return (
    <>
      {!seeuser ? (
        <></>
      ) : (
        <Main>
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
                  ownerImage={seeuser.avatar.url}
                  ownerName={seeuser.name}
                  ownerId={seeuser._id}
                  isDelete={false}
                  isAccount={false}
                />
              </div>
            )}
            <Head>
              <Header show={false} />
            </Head>
            <Down>
              <Top>
                <img src={seeuser.avatar.url} alt={seeuser.name} />
                <div className="detail">
                  <p>
                    <span className="bold">{state.user.name}</span>
                    <button
                      onClick={() => {
                        handlefollow();
                      }}
                    >
                      {!follow ? "Followed" : "Follow"}
                    </button>
                  </p>
                  <div className="count">
                    <span>
                      <span className="bold">
                        {state.user.followers.length}
                      </span>{" "}
                      Followers
                    </span>
                    <span>
                      <span className="bold">{seeuser.following.length}</span>{" "}
                      Following
                    </span>
                    <span>
                      <span className="bold">{seeuser.posts.length}</span> Posts
                    </span>
                  </div>
                </div>
              </Top>
              <Bottom>
                <p>Posts</p>
                <div className="post">
                  {seeuser.posts.map((post, index) => {
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
              </Bottom>
            </Down>
          </>
        </Main>
      )}
    </>
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
  justify-content: space-evenly;
  align-items: center;
  font-family: "Poppins";

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
      gap: 3vw;
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
