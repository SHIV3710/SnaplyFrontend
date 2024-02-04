import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Header } from "../Components/Header";
import { User } from "../Components/User";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../Components/Post";
import { getAllusers, getfollowingpost } from "../Actions/User";
import { CreatePost } from "./CreatePost";
import { Search } from "./Search";
import { AnyUser } from "./AnyUser";
import { Account } from "./Account";
import { ChangePassword } from "../Components/ChangePassword";
import { EditProfile } from "../Components/EditProfile";

export const Social = () => {
  const dispatch = useDispatch();
  let [component, setcomponent] = useState(undefined);
  const { path, user, message } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.postoffollwing);

  useEffect(() => {
    let url = path;
    if (url === "/account") {
      setcomponent(<Account />);
    } else if (url === "/seeuser") {
      setcomponent(<AnyUser />);
    } else if (url === "/changepassword") {
      setcomponent(<ChangePassword />);
    } else {
      setcomponent(undefined);
    }
  }, [path]);

  useEffect(() => {
    dispatch(getfollowingpost());
    dispatch(getAllusers());
  }, [message]);

  const check = (user) => {
    let len = user.followers.length;
    for (let i = 0; i < len; i++) {
      if (user.followers[i] === loginuserid) return false;
    }
    return true;
  };
  let loginuserid = user._id;
  const { users } = useSelector((state) => state.allUsers);

  return (
    <Main>
      <CreatePost />
      <ChangePassword />
      <EditProfile />
      <Head>
        <Header />
      </Head>
      <Bottom>
        <Search />
        {component ? (
          <>{component}</>
        ) : (
          <>
            <Left>
              {posts && posts.length > 0 ? (
                posts.map((post, index) => {
                  return <Post key={index} postId={post._id} />;
                })
              ) : (
                <></>
              )}
            </Left>
            <Right>
              <div className="user">Suggested for you</div>
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
                      }
                    })}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </Right>
          </>
        )}
      </Bottom>
    </Main>
  );
};

const Main = styled.div`
  min-height: 100svh;
  width: 100svw;
  display: flex;
  gap: 1vw;
  z-index: 900;
  position: relative;
  user-select: none;
  scroll-behavior: smooth;
  @media screen and (max-width: 800px) {
    flex-direction: column-reverse;
    gap: 0;
  }
`;
const Head = styled.div`
  height: 100vh;
  @media screen and (max-width: 800px) {
    height: 10vh;
    width: 100vw;
  }
`;
const Bottom = styled.div`
  height: 100vh;
  display: flex;
  @media screen and (max-width: 800px) {
    flex-direction: row;
    height: 90vh;
    width: 100vw;
  }
`;
const Left = styled.div`
  height: 100vh;
  width: 65vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  overflow-y: scroll;
  @media screen and (max-width: 800px) {
    height: 90vh;
    width: 100vw;
  }
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 19vw;
  @media screen and (max-width: 800px) {
    height: 90vh;
    width: 15vw;
    display: none;
  }

  .user {
    font-size: large;
    font-family: "Poppins";
    backdrop-filter: blur(10px);
    margin: 1vh 0;
    width: 20vw;
    height: 5vh;
    text-align: center;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 800px) {
      font-size: xx-small;
      margin: 0;
    }
  }
  .users {
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: self-start;
    width: 90%;
  }
`;
