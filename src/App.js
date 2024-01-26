import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
  useSearchParams,
} from "react-router-dom";
import { Social } from "./Pages/Social";
import { Signup } from "./Pages/Signup";
import { Login } from "./Pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loaduser } from "./Actions/User";
import { Account } from "./Pages/Account";
import { CreatePost } from "./Pages/CreatePost";
import { Search } from "./Pages/Search";
import { AnyUser } from "./Pages/AnyUser";

export default function App() {
  const dispatch = useDispatch();
  const { auth, seeuser } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(loaduser());
  }, [auth]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!auth ? <Login /> : <Social />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={!auth ? <Login /> : <Account />} />
        <Route path="/newpost" element={auth ? <CreatePost /> : <Login />} />
        <Route path="/search" element={auth ? <Search /> : <Login />} />
        <Route path="/seeuser" element={auth ? <AnyUser /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}
