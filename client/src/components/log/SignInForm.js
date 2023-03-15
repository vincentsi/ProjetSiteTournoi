import React, { useState } from "react";
import axios from 'axios';

const SignInForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin =(e)=>{
      e.preventDefault();

      const usernameError = document.querySelector('.username.error');
      const passwordError = document.querySelector('.password.error');

      axios({
        method: "post",
        url:`${process.env.REACT_APP_API_URL}api/auth/signin`,
        withCredentials: true,
        data:{
          username,
          password,
        },
      })
        .then((res)=> {
          console.log(res);
          if (res.data.errorsusername || res.data.errorspassword){
            
            usernameError.innerHTML = res.data.errorsusername;
          // }else if (res.data.errorspassword){
            passwordError.innerHTML = res.data.errorspassword;
          }else{
            console.log(res)
            window.location = '/';
          }
        })
        .catch((err)=> {
          console.log(err)
        })

   };

  return (
    <form action="" onSubmit={handleLogin} id="sign-up-form">
        <label htmlFor="username">username</label>
        <input 
          type="text" 
          id="username" 
          name="username" 
          onChange={(e) => setUsername(e.target.value)} 
          value={username}
        />
        <div className="username error"></div>
        <br/>
        <label htmlFor="password">mot de passe</label>
        <br/>
        <input 
          type="password" 
          name="password" 
          id="password"
          onChange={(e) => setPassword(e.target.value)} 
          value={password}
        />
        <div className="password error"></div>
        <br/>
        <input type="submit" value="se connecter"/>
    </form>

  );
};

export default SignInForm;
