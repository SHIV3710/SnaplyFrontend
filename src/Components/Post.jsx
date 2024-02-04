import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GoHeart } from "react-icons/go";
import { BiComment } from "react-icons/bi";
import { TbHttpDelete } from "react-icons/tb";
import { FcLike } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import {
  commentonpost,
  deletepost,
  getapost,
  likepost,
  updatecaption,
} from "../Actions/Post";
import { AllLike } from "./AllLike";
import { AllComments } from "./AllComments";

export const Post = ({ postId, isDelete = false, isAccount = false }) => {
  const [liked, setliked] = useState(false);
  const [alllikes, setlikes] = useState(false);
  const [allcomment, setallcomment] = useState(false);
  const [comment, setcomment] = useState("Add a new comment");
  const [changecaption, setchangecaption] = useState(false);
  const [newcaption, setcaption] = useState();
  const [post, setpost] = useState(undefined);

  const { id, message } = useSelector((state) => state.like);
  const { loading: ac } = useSelector((state) => state.addcomment);
  const { loading: dc } = useSelector((state) => state.deletecomment);

  const dispatch = useDispatch();

  const getpost = async () => {
    await getapost(postId).then((res) => setpost(res));
  };

  useEffect(() => {
    getpost();
  }, [message, ac, dc]);

  useEffect(() => {
    if (post) {
      post.likes.forEach((item) => {
        if (item._id === user._id) {
          setliked(true);
        }
      });
    }
  }, [post]);

  const { user, seeuser } = useSelector((state) => state.user);

  const handlelike = async () => {
    setliked(!liked);
    await dispatch(likepost(postId));
    await getpost();
  };

  const handlechangecaption = async () => {
    setchangecaption(!changecaption);
  };

  const handletotallike = () => {
    setlikes(!alllikes);
  };

  const handleallcomment = () => {
    setallcomment(!allcomment);
  };

  const handlecomment = async () => {
    if (comment) {
      await dispatch(commentonpost(postId, comment, user));
      await getpost();
    }
  };

  const handlepostdelete = async () => {
    await dispatch(deletepost(postId));
  };

  const handlecaption = async () => {
    if (newcaption) {
      await dispatch(updatecaption(postId, newcaption));
      await getpost();
    }
  };

  return (
    <>
      {post ? (
        <>
          <Main>
            {alllikes ? (
              <AllLike users={post.likes} func={handletotallike} />
            ) : (
              <></>
            )}
            {allcomment ? (
              <AllComments
                isAccount={isAccount}
                comments={post.comments}
                postId={postId}
                func={handleallcomment}
              />
            ) : (
              <></>
            )}
            <img src={post.image.url} alt="Post" />
            <PostDetail>
              <div className="icon">
                {liked ? (
                  <FcLike onClick={handlelike} />
                ) : (
                  <GoHeart onClick={handlelike} />
                )}
                <BiComment
                  style={{ fontSize: "smaller" }}
                  onClick={handleallcomment}
                />
                {isDelete ? <TbHttpDelete onClick={handlepostdelete} /> : null}
              </div>
              <Link>
                <p
                  style={{
                    minWidth: "fit-content",
                    fontWeight: "bold",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {post.owner.name}
                </p>
              </Link>
              <div style={{ fontStyle: "italic" }} className="caption">
                Caption: {post.caption}
              </div>
              <div
                className="likes"
                style={{ fontFamily: "Poppins" }}
                onClick={handletotallike}
              >
                {post.likes.length} LIKES
              </div>
              {isAccount ? (
                <Caption onClick={handlechangecaption}>
                  {!changecaption ? <p>Change Caption</p> : <p>Add Comment</p>}
                </Caption>
              ) : (
                <></>
              )}
            </PostDetail>
            {changecaption ? (
              <>
                <Comment>
                  <div>
                    <input
                      type="text"
                      placeholder="Add a new Caption"
                      onChange={(e) => setcaption(e.target.value)}
                    />
                  </div>
                  <button onClick={handlecaption}>Change</button>
                </Comment>
              </>
            ) : (
              <>
                <Comment>
                  <div>
                    <input
                      type="text"
                      placeholder={comment}
                      onChange={(e) =>
                        e.target.value
                          ? setcomment(e.target.value)
                          : setcomment("Add a new Comment")
                      }
                    />
                  </div>
                  <button onClick={handlecomment}>Post</button>
                </Comment>
              </>
            )}
          </Main>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

const Main = styled.div`
  width: fit-content;
  height: fit-content;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  row-gap: 0.2vh;
  font-family: "Poppins", sans-serif;
  user-select: none;
  margin: 1vh 0;
  padding: 1vh;
  position: relative;
  background-size: cover;
  border: 1px solid gray;
  @media screen and (max-width: 800px) {
    width: fit-content;
    height: fit-content;
    padding: 0.5vh;
  }
  > img {
    height: 50vh;
    width: 60vw;
    border: 2px solid grey;
    border-radius: 2px;
    object-fit: contain;
    background-color: black;
    @media screen and (max-width: 800px) {
      min-height: 10vh;
      height: 20vh;
      width: 80vw;
    }
  }
`;
const PostDetail = styled.div`
  display: flex;
  flex-direction: column;
  width: 97%;
  gap: 0.5vh;
  cursor: pointer;
  font-size: small;
  @media screen and (max-width: 800px) {
    font-size: xx-small;
  }

  > a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: black;
    gap: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  > a > img {
    height: 3vmax;
    width: 3vmax;
    border-radius: 50%;
  }

  .icon {
    display: flex;
    align-items: center;
    gap: 1vw;
    font-size: 2rem;
    @media screen and (max-width: 800px) {
      font-size: large;
    }
  }
  .caption {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Comment = styled.div`
  max-height: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    height: 20px;
    width: 55vw;
    background: transparent;
    border: none;
    border-bottom: 1px solid #000000;
    font-family: "Poppins", sans-serif;
    font-size: xx-small;
    @media screen and (max-width: 800px) {
      width: 70vw;
    }
  }
  input:focus {
    outline: none;
  }

  button {
    display: flex;
    align-items: center;
    width: fit-content;
    border-radius: 1rem;
    justify-content: center;
    background: #ffffff;
    font-family: "Poppins", sans-serif;
    font-size: 15px;
    cursor: pointer;
    border: none;
    color: #00acdf;
    @media screen and (max-width: 800px) {
      font-size: x-small;
      justify-content: end;
    }
  }
  button:hover {
    color: #000000;
  }
`;

const Caption = styled.div`
  display: flex;
  align-self: flex-start;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  height: 5vh;
  color: #00a2ff;
  &:hover {
    color: #000000;
  }
  @media screen and (max-width: 800px) {
    font-size: small;
  }
`;
