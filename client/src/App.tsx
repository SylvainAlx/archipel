/* eslint-disable @typescript-eslint/no-explicit-any */
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./layouts/header";
import Footer from "./layouts/footer";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element= {<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
      <Footer />
    </>
  );
}
