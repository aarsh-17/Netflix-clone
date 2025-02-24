import React, { useState,useEffect } from 'react';
import './css/Login.css'; // Import CSS file for styling
import axios from 'axios'; // Import Axios for making HTTP requests

import { useCookies } from 'react-cookie';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [cookies, setCookie,removeCookie] = useCookies(['authToken']);
    
  useEffect(()=>{ 
    const token = cookies.authToken;
    console.log(cookies.authToken);
    
    if(!token){
      setIsAuthenticated(false);
    }
    // else{
    //   jwt.verify(token, SECRET_KEY, (err, decoded) => {
    //     if (err) {
    //       console.error('Invalid token:', err);
    //     } else {
    //       console.log('Expiration time (UNIX timestamp):', decoded.exp);
    //       console.log('Expiration time (Date):', new Date(decoded.exp * 1000));
    //     }
    //   });
    // }
    })
    const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:5000/login', { name, password })
      .then(data =>{
         //cookies.save('authToken', data.data.token, { path: '/' ,maxAge:3600});
         setCookie('authToken', data.data.token, { path: '/' ,maxAge:3600}); // Ensure the path matches where the cookie was set
         console.log(cookies.authToken); // This should log the token value
         setIsAuthenticated(true); // Set isAuthenticated to true after successful login
       // window.location.href = "/";
        
      } )
      .catch(error => console.log(error));
    console.log('name:', name);
    console.log('Password:', password);
    // Reset the form
   // setName('');
    //setPassword('');
  };

  const handleLogout = () => {
    //cookies.remove('authToken', { path: '/' }); // Ensure the path matches where the cookie was set
    removeCookie('authToken',{path:'/'});
    setIsAuthenticated(false);
  };

  return (
    <>
    {isAuthenticated ? (
      <div>
   
        <h1>You are logged in!</h1>
        <p>Click <a href="/">here</a> to go back to the main page.</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
      ) : (<div className="login-container">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="name"
            placeholder="name or phone number"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className='button-login'>Sign In</button>
        </form>
        <div className="login-footer">
          <p>New to Netflix? <a href="#">Sign up now.</a></p>
          <p>This page is protected by Google reCAPTCHA to ensure you’re not a bot. <a href="#">Learn more.</a></p>
        </div>
      </div>)}
    
    </>
    
  );
};

export default Login;
