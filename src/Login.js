import {useState} from "react";
import './App.css'

export default function Login({ user, setUser, loggedIn, setloggedIn }) {
  const postHeader = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  };
  const [signupIsClicked, setsignupIsClicked] = useState(false)

  const handleSignIn = async () => {
    let request = postHeader;
    let lastName = document.getElementById("last").value;
    let firstName = document.getElementById("first").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let body = { lastName, firstName, password, username };
    request.body = JSON.stringify(body);
    await fetch(
      process.env.REACT_APP_URL + "/user",
      request
    );
    setsignupIsClicked(false)
  };
  const handleLogin = async () => {
    let request = postHeader;
    let username = document.getElementById("Lusername").value;
    let password = document.getElementById("Lpassword").value;
    let body = JSON.stringify({ username, password });
    request.body = body;
    const login = await fetch(process.env.REACT_APP_URL + "/login", request);
    console.log(login)
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
