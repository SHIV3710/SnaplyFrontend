import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Header } from "../Components/Header";
import { User } from "../Components/User";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../Components/Post";
import { followuser, getAllusers, getfollowingpost } from "../Actions/User";
import { CreatePost } from "./CreatePost";
import { Search } from "./Search";
import { AnyUser } from "./AnyUser";
import { Account } from "./Account";
import { ChangePassword } from "../Components/ChangePassword";

export const Social = () => {
  const dispatch = useDispatch();
  let [component, setcomponent] = useState(undefined);
  const { path, user } = useSelector((state) => state.user);
  useEffect(() => {
    let url = path;
    if (url === "/newpost") {
      setcomponent(<CreatePost />);
    } else if (url === "/search") {
      setcomponent(<Search />);
    } else if (url === "/account") {
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
  }, [user]);

  const check = (user) => {
    let len = user.followers.length;
    for (let i = 0; i < len; i++) {
      if (user.followers[i] == loginuserid) return false;
    }
    return true;
  };
  let loginuserid = user._id;

  const { posts } = useSelector((state) => state.postoffollwing);
  const { users } = useSelector((state) => state.allUsers);

  return (
    <Main>
      <Head>
        <Header />
      </Head>
      <Bottom>
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
              <div
                className="user"
                style={{
                  fontSize: "1rem",
                  height: "5vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Suggested for you
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
          </>
        )}
      </Bottom>
    </Main>
  );
};

const Main = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  gap: 1vw;
  user-select: none;
`;
const Head = styled.div`
  height: 100vh;
`;
const Bottom = styled.div`
  height: 100vh;
  display: flex;
`;
const Left = styled.div`
  height: 100vh;
  width: 65vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  overflow-y: scroll;
`;
const Right = styled.div`
  display: flex;
  /* width: 20vw; */
  flex-direction: column;
  align-items: start;

  .user {
    font-size: x-large;
    font-family: "Poppins";
    backdrop-filter: blur(10px);
    margin: 1vh 0;
    width: 15vw;
    text-align: center;
    border-radius: 5px;
  }
  .users {
    /* width: 90%; */
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: self-start;
  }
`;
