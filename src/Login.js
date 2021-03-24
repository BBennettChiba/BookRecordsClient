import { useRef } from "react";
import "./App.css";
import axios from "axios";
import { Form, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"

export default function Login({ user, setUser, setLoggedIn, loggedIn }) {
    const passwordRef = useRef()
    const usernameRef = useRef()
    const handleLogin = async () => {
        let username = usernameRef.current.value;
        let password = passwordRef.current.value;
        const login = await axios.post(process.env.REACT_APP_URL + "/login", {
            username,
      password,
    });
    console.log(login)
    if (login.status === 200) {
      setUser(username);
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  };
  return (
    <>
      <Card>
        <h2 className="text-center mb-4">Login</h2>
        <Form>
          <Form.Group id='username'>
            <Form.Label>Username</Form.Label>
            <Form.Control type="username" ref={usernameRef} required></Form.Control>
          </Form.Group>
          <Form.Group id=''>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" ref={passwordRef} required></Form.Control>
          </Form.Group>
        </Form>
      </Card>
      <Button onClick={handleLogin} className="w-100" type="submit">Login</Button>
    </>
  );
}

// <div className="login">
//   <div className="realLogin">
//   Username<input type="text" id="Lusername"></input>
//   Password<input type="text" id="Lpassword"></input>
//   {signupIsClicked &&
//   <div className="signupButton">
//   last Name<input type="text" id="last"></input>
//   first Name <input type="text" id="first"></input>
//   Username<input type="text" id="username"></input>
//   Password<input type="text" id="password"></input>
//     <button onClick={handleSignIn}>Sign up</button>
//   </div>}
//       <button onClick={handleLogin}>Login</button>
//       {!signupIsClicked && <button onClick={showSignup} className="signupButton">Sign Up</button>}
//   </div>
// </div>
