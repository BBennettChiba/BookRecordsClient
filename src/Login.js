import { useRef } from "react";
import "./App.css";
import axios from "axios";
import { Form, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login({
  user,
  setUser,
  setLoggedIn,
  loggedIn,
  setLoginSwitch,
}) {
  const passwordRef = useRef();
  const usernameRef = useRef();
  const handleLogin = async () => {
    let username = usernameRef.current.value;
    let password = passwordRef.current.value;
    try {
        await axios.post(process.env.REACT_APP_URL + "/login", {
        username,
        password,
      });
      setUser(username);
      setLoggedIn(true);
    } catch (err) {
      window.alert(err);
      setLoggedIn(false);
    }
  };
  const goToSignIn = () => {
    setLoginSwitch(false);
  };
  return (
    <>
      <Card>
        <h2 className="text-center mb-4">Login</h2>
        <Form>
          <Form.Group id="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              ref={usernameRef}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group id="">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              ref={passwordRef}
              required
            ></Form.Control>
          </Form.Group>
        </Form>
      </Card>
      <Button onClick={handleLogin} className="w-100" type="submit">
        Login
      </Button>
      <Button
        onClick={goToSignIn}
        className="w-50"
        type="signIn"
        style={{ backgroundColor: "purple" }}
      >
        No Account? Sign Up
      </Button>
    </>
  );
}
