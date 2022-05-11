import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBarBoos } from "../components/NavBarBoos";
import { Admin } from "../pages/admin/Admin";
import { Login } from "../pages/Auth/Login";
import { Register } from "../pages/Auth/Register";
import { About } from "../pages/home/About";
import { AllUsers } from "../pages/home/AllUsers";
import { Home } from "../pages/home/Home";
import { Service } from "../pages/home/Service";
import { User } from "../pages/user/User";

export const AppRoutes = ({ isLogged, setIsLogged }) => {
  return (
    <BrowserRouter>
      <NavBarBoos isLogged={isLogged} setIsLogged={setIsLogged} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setIsLogged={setIsLogged} />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/allusers" element={<AllUsers />} />
        <Route path="/services" element={<Service />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
