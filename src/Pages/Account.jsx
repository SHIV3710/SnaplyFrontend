import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getMyPosts } from "../Actions/Post";
import { Post } from "../Components/Post";
import { RxCross2 } from "react-icons/rx";
import {
  addPostclearErrors,
  addPostclearMessages,
  addcommentclearErrors,
  addcommentclearMessages,
  changeCaptionclearErrors,
  changeCaptionclearMessages,
  changeabsolute,
  clearErrors,
  clearMessages,
  deletecommentclearErrors,
  deletecommentclearMessages,
} from "../Store/Reducers/post";
import { deleteProfile } from "../Actions/User";

export const Account = () => {
  const dispatch = useDispatch();
  const [show, setshow] = useState(undefined);
  const { user, message, error, auth } = useSelector((state) => state.user);
  const { component } = useSelector((state) => state.Absolute);
  const { posts } = useSelector((state) => state.mypost);
  const [showcontent, setshowcontent] = useState("0");

  const { message: likemessage, error: likeerror } = useSelector(
    (state) => state.like
  );
  const { message: deletemessage, error: deleteerror } = useSelector(
    (state) => state.deletecomment
  );
  const { message: addmessage, error: adderror } = useSelector(
    (state) => state.addcomment
  );

  const { message: addpostmessage, error: addposterror } = useSelector(
    (state) => state.addpost
  );

  const { message: captionmessage, error: captionerror } = useSelector(
    (state) => state.changecaption
  );

  const handleprofile = () => {
    if (component === "/editprofile") {
      dispatch(changeabsolute(null));
    } else {
      dispatch(changeabsolute("/editprofile"));
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
      setshow(undefined);
      dispatch(addPostclearMessages());
    }
    if (addposterror) {
      setshow(undefined);
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
      <>
        {!show ? (
          <></>
        ) : (
          <div className="absolute">
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
            <button onClick={() => handleimage(undefined)}> Close</button>
          </div>
        )}
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
            <p>Posts</p>
            <div className="post">
              {posts.map((post, index) => {
                return (
                  <div key={index}>
                    <img
                      src={post.image.url}
                      key={index}
                      onClick={() => handleimage(post)}
                    />
                  </div>
                );
              })}
            </div>
          </Bottom>
        </Down>
      </>
    </Main>
  );
};

const Main = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  @media screen and (max-width: 800px) {
    width: 100vw;
  }
  .absolute {
    height: 100vh;
    width: 80vw;
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    @media screen and (max-width: 800px) {
      width: 100vw;
    }
    > button {
      height: 4vh;
      width: 5vw;
      font-family: "Poppins";
      top: 90%;
      position: absolute;
      cursor: pointer;
      @media screen and (max-width: 800px) {
        width: 15vw;
        top: 70%;
        outline-style: none;
      }
    }
  }
`;
const Down = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  /* overflow-y: scroll; */
  @media screen and (max-width: 800px) {
    width: 100vw;
  }
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
    height: 25vh;
  }
  > img {
    height: 10svw;
    width: 10svw;
    object-fit: cover;
    border-radius: 50%;
    @media screen and (max-width: 800px) {
      width: 20vw;
      height: 20svw;
    }
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
      justify-content: space-between;
      align-items: center;
      @media screen and (max-width: 800px) {
        width: 40vw;
        font-size: small;
        gap: 3vw;
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
        @media screen and (max-width: 800px) {
          width: 25vw;
          font-size: xx-small;
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
      font-size: xx-small;
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
    width: 70vw;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1vw;
    padding: 1vh 0px;
    overflow: scroll;
    @media screen and (max-width: 800px) {
      width: 100vw;
    }
    img {
      height: 40vh;
      width: 40vh;
      border-radius: 1rem;
      object-fit: cover;
    }
  }
`;
