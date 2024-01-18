import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Header } from "../Components/Header";
import { User } from "../Components/User";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../Components/Post";
import { followuser, getAllusers, getfollowingpost } from "../Actions/User";
import { Loader } from "../Components/Loader";
import {
  addcommentclearErrors,
  addcommentclearMessages,
  clearErrors,
  clearMessages,
  deletecommentclearErrors,
  deletecommentclearMessages,
} from "../Store/Reducers/post";

export const Social = () => {
  const dispatch = useDispatch();

  const check = (user) => {
    let len = user.followers.length;
    for (let i = 0; i < len; i++) {
      if (user.followers[i] == loginuserid) return false;
    }
    return true;
  };

  const {
    user,
    message: usermessage,
    error: usererror,
    loading: userloading,
    auth,
  } = useSelector((state) => state.user);

  let loginuserid = user._id;

  const { posts, loading, error } = useSelector(
    (state) => state.postoffollwing
  );

  const {
    users,
    loading: alluserloading,
    error: allusererror,
    message: allusermessage,
  } = useSelector((state) => state.allUsers);

  const { error: likerror, message } = useSelector((state) => state.like);

  const { message: addcommentmessage, error: addcommenterror } = useSelector(
    (state) => state.addcomment
  );

  const { message: deletecommentmessage, error: deletecommenterror } =
    useSelector((state) => state.deletecomment);

  useEffect(() => {
    dispatch(getAllusers());
    dispatch(getfollowingpost());
  }, [dispatch, auth]);

  useEffect(() => {
    if (likerror) {
      dispatch(clearErrors());
    }
    if (message) {
      dispatch(clearMessages());
    }
    if (addcommentmessage) {
      dispatch(addcommentclearMessages());
    }
    if (addcommenterror) {
      dispatch(addcommentclearErrors());
    }
    if (deletecommentmessage) {
      dispatch(deletecommentclearMessages());
    }
    if (deletecommenterror) {
      dispatch(deletecommentclearErrors());
    }
  }, [
    error,
    message,
    addcommentmessage,
    addcommenterror,
    deletecommenterror,
    deletecommentmessage,
  ]);
  return alluserloading ? (
    <Loader />
  ) : (
    <Main>
      <Header />
      <Bottom>
        <Left>
          {posts && posts.length > 0 ? (
            posts.map((post, index) => {
              return (
                <Post
                  key={index}
                  postId={post._id}
                  caption={post.caption}
                  postImage={post.image.url}
                  likes={post.likes}
                  comments={post.comments}
                  ownerImage={post.owner.avatar.url}
                  ownerName={post.owner.name}
                  ownerId={post.owner._id}
                  isDelete={false}
                  isAccount={false}
                />
              );
            })
          ) : (
            <></>
          )}
        </Left>
        <Right>
          <div
            className="user"
            style={{
              backgroundColor: "#00acdf",
              fontSize: "1rem",
              height: "5vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            People you may know
          </div>
          <div className="users">
            {users && users.length > 0 ? (
              <>
                {users.map((user, index) => {
                  if (user._id !== loginuserid && check(user)) {
                    return (
                      <User
                        Id={user._id}
                        name={user.name}
                        key={index}
                        avatar={user.avatar.url}
                        follow={false}
                      />
                    );
                  } else if (!check(user)) {
                    return (
                      <User
                        Id={user._id}
                        name={user.name}
                        key={index}
                        avatar={user.avatar.url}
                        follow={true}
                      />
                    );
                  }
                })}
              </>
            ) : (
              <></>
            )}
          </div>
        </Right>
      </Bottom>
    </Main>
  );
};

const Main = styled.div`
  height: 100svh;
  width: 100svw;
`;

const Bottom = styled.div`
  height: 90vh;
  width: 100vw;
  display: flex;
`;
const Left = styled.div`
  height: 100%;
  width: 75svw;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  overflow-y: scroll;
`;
const Right = styled.div`
  height: 100%;
  width: 30vw;
  display: flex;
  flex-direction: column;
  align-items: start;

  .user {
    font-size: x-large;
    font-family: "Poppins";
    backdrop-filter: blur(10px);
    margin: 1vh 0;
    width: 90%;
    text-align: center;
    border-radius: 5px;
  }
  .users {
    height: 90%;
    width: 90%;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: self-start;
  }
`;
