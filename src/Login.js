import {useState} from "react";
import './App.css'
import axios from 'axios';

export default function Login({ user, setUser, loggedIn, setloggedIn }) {
  const [signupIsClicked, setsignupIsClicked] = useState(false)

  const handleSignIn = async () => {
    let lastName = document.getElementById("last").value;
    let firstName = document.getElementById("first").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    await axios.post(`${process.env.REACT_APP_URL}/user`, {lastName,firstName,username,password})
    setsignupIsClicked(false)
  };
  const handleLogin = async () => {
    let username = document.getElementById("Lusername").value;
    let password = document.getElementById("Lpassword").value;
    const login = await axios.post(process.env.REACT_APP_URL + "/login", {username,password});
    if (login.status === 200) {
      setUser(username);
      setloggedIn(true);
    } else {
      setloggedIn(false);
    }
  };
  const showSignup = () =>{
      setsignupIsClicked(true);
  }
  return (
    <div className="login">
      <div className="realLogin">
      Username<input type="text" id="Lusername"></input>
      Password<input type="text" id="Lpassword"></input>
      {signupIsClicked && 
      <div className="signupButton">
      last Name<input type="text" id="last"></input>
      first Name <input type="text" id="first"></input>
      Username<input type="text" id="username"></input>
      Password<input type="text" id="password"></input>
        <button onClick={handleSignIn}>Sign up</button>
      </div>}
          <button onClick={handleLogin}>Login</button>
          {!signupIsClicked && <button onClick={showSignup} className="signupButton">Sign Up</button>}
      </div>
    </div>
  );
}
