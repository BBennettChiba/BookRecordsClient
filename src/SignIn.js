import { useRef } from "react";
import "./App.css";
import axios from "axios";
import { Form, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"

export default function SignIn({ setLoginSwitch, loginSwitch}) {
  const firstNameRef =useRef()
  const lastNameRef =useRef()
  const usernameRef =useRef()
  const passwordRef =useRef()

  const handleSignIn = async () => {
    let lastName = lastNameRef.current.value;
    let firstName = firstNameRef.current.value;
    let username = usernameRef.current.value;
    let password = passwordRef.current.value;
    await axios.post(`${process.env.REACT_APP_URL}/user`, {
      lastName,
      firstName,
      username,
      password,
    });
    setLoginSwitch(!loginSwitch);
  };
return (
    <>
      <Card>
        <h2 className="text-center mb-4">Sign Up</h2>
        <Form>
          <Form.Group id='firstName'>
            <Form.Label>First Name</Form.Label>
            <Form.Control type="firstName" ref={firstNameRef} required></Form.Control>
          </Form.Group>
          <Form.Group id='lastName'>
            <Form.Label>last Name</Form.Label>
            <Form.Control type="lastName" ref={lastNameRef} required></Form.Control>
          </Form.Group>
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
      <Button onClick={handleSignIn} className="w-100" type="submit">Sign up</Button>
      <div className="w-100 text-center mt-2">
        Alrady have an account?<Button onClick={()=>setLoginSwitch(!loginSwitch)}>Login</Button>
      </div>
    </>
  );
}