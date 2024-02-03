import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../Components/Post";
import { RxCross2 } from "react-icons/rx";
import { followuser } from "../Actions/User";
import { changepost } from "../Store/Reducers/post";
import { Search } from "./Search";
import { CreatePost } from "./CreatePost";
export const AnyUser = () => {
  const dispatch = useDispatch();
  const [show, setshow] = useState(undefined);
  const { seeuser } = useSelector((state) => state.user);
  const { post } = useSelector((state) => state.Absolute);
  const { loading } = useSelector((state) => state.like);
  const [follow, setfollow] = useState(false);
  const handleimage = async (value) => {
    dispatch(changepost(value));
  };

  useEffect(() => {
    setshow(post);
  }, [post, loading]);

  const handlefollow = async () => {
    await dispatch(followuser(seeuser._id));
    setfollow(!follow);
  };

  return (
    <>
      <Search />
      <CreatePost />
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
                    marginBottom: "50%",
                    fontSize: "30px",
                    cursor: "pointer",
                  }}
                />
                <Post
                  postId={show._id}
                  isDelete={false}
                  isAccount={false}
                  key={show._id}
                />
              </div>
            )}
            <Down>
              <Top>
                <img src={seeuser.avatar.url} alt={seeuser.name} />
                <div className="detail">
                  <p>
                    <span className="bold">{seeuser.name}</span>
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
                      <span className="bold">{seeuser.followers.length}</span>{" "}
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
                      <div key={index}>
                        <img
                          src={post.image.url}
                          key={index}
                          onClick={() => handleimage(post, index)}
                        />
                      </div>
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
  height: 100vh;
  display: flex;
  align-items: center;
  overflow: scroll;
`;
const Down = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Top = styled.div`
  height: 30vh;
  width: 79vw;
  display: flex;
  justify-content: center;
  gap: 5vw;
  align-items: center;
  font-family: "Poppins";
  @media screen and (max-width: 800px) {
    width: 100vw;
  }

  > img {
    height: 10svw;
    width: 10svw;
    object-fit: cover;
    border-radius: 50%;
    box-shadow: 0 29px 52px rgba(0, 0, 0, 0.4), 0 25px 16px rgba(0, 0, 0, 0.2);
  }
  .detail {
    height: fit-content;
    width: 30vw;
    display: flex;
    flex-direction: column;
    gap: 2vh;
    justify-content: center;
    @media screen and (max-width: 800px) {
      width: 40vw;
    }

    > p {
      display: flex;
      width: 20vw;
      gap: 2vw;
      align-items: center;
      @media screen and (max-width: 800px) {
        width: 40vw;
      }

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
    @media screen and (max-width: 800px) {
      width: 40vw;
    }
  }
  .bold {
    font-weight: bold;
    justify-self: flex-start;
  }
`;
const Bottom = styled.div`
  height: 60vh;
  width: 81.5vw;
  font-family: "Poppins";
  display: flex;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 800px) {
    width: 100vw;
  }

  gap: 1vw;
  cursor: pointer;

  .post {
    display: flex;
    width: 60vw;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1vw;
    padding: 1vh 0px;
    overflow: scroll;
    img {
      height: 40vh;
      width: 40vh;
      border-radius: 1rem;
      object-fit: cover;
      @media screen and (max-width: 800px) {
        height: 30vh;
        width: 30vh;
      }
    }
  }
`;
