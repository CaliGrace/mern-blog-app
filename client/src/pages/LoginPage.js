import React, {useContext, useState} from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContextProvider";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);
  const {setUserInfo} = useContext (UserContext)

  const loginHandler = async(e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:4000/login', {
      headers: {'Content-Type': 'application/json'},
      method: 'POST',
      body: JSON.stringify({username,password}),
      credentials: 'include'
    })

    if(response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo)
      })
      setRedirect(true);
    } else {
      alert('Login failed');
    }
  }

  if(redirect) {
    return <Navigate to={"/"} />
  }

  return (
    <form className="login" onSubmit={loginHandler}>
      <h2>Login Page</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
