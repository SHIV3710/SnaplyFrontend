import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Social } from "./Pages/Social";
import { Signup } from "./Pages/Signup";
import { Login } from "./Pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loaduser } from "./Actions/User";
import { AnyUser } from "./Pages/AnyUser";
import { Header } from "./Components/Header";

export default function App() {
  const dispatch = useDispatch();
  const { auth, seeuser } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(loaduser());
  }, [auth]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={!auth ? <Login /> : <Social />} />
          <Route path="/signup" element={!auth ? <Signup /> : <Social />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
