import React, {useState} from 'react'

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword]  = useState('');

  const submitHundler = async (e) => {
    e.preventDefault();
     const response = await fetch('http://localhost:4000/register',{
        method: 'Post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username,password})
      })
    if(response.status === 200) {
      alert('Registration Successful')
    } else {
      alert('Registration Failed')
    }
  }
  return (
    <form className="register" onSubmit={submitHundler}>
      <h2>Register Page</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <button type="submit">Register</button>
    </form>
  )
}

export default RegisterPage