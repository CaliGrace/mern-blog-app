import React, { useEffect, useState,useContext } from "react";
import { Link, NavLink } from "react-router-dom";

import {UserContext} from './UserContextProvider'

const Header = () => {
  const {userInfo, setUserInfo} = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: 'include'
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  const logout = () => {
    fetch('http://localhost:4000/logout', {
      credentials: 'include', 
      method: 'Post'
    })
    setUserInfo(null);
  }

  const username = userInfo?.username;
  return (
    <header>
      <Link className="logo" to="/" style={{ letterSpacing: "-2px" }}>
        MyBlog
      </Link>
      <ul className="additional-links">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
        <li>
          <NavLink to="/more">More</NavLink>
        </li>
      </ul>
      {username && (
        <nav>
          <Link to="/create">Create New Post</Link>
          <button className="logout" onClick={logout}>Logout</button>
        </nav>
      )}
      {!username && (
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
