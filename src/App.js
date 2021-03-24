import "./App.css";
import { useState } from "react";
import Scan from "./Scan.js";
import BookList from "./BookList";
import SignIn from "./SignIn";
import { Container, Button } from "react-bootstrap";
import Login from "./Login";

function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [user, setUser] = useState(null);
  const [newUpload, setNewUpload] = useState(null);
  const [loginSwitch, setLoginSwitch] = useState(null);

  return (
    <div className="App">
      {!loggedIn && (
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="w-100" style={{ maxWidth: "400px" }}>
            {!loginSwitch && (
              <SignIn
                loginSwitch={loginSwitch}
                setLoginSwitch={setLoginSwitch}
              />
            )}
            {loginSwitch && !loggedIn && (
              <Login
                setLoginSwitch={setLoginSwitch}
                setUser={setUser}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />
            )}
          </div>
        </Container>
      )}
      {loggedIn && (
        <Scan user={user} newUpload={newUpload} setNewUpload={setNewUpload} />
      )}
      {loggedIn && <BookList user={user} newUpload={newUpload}></BookList>}
      {loggedIn && <Button onClick={()=>{setLoggedIn(false)}}>Logout</Button>}
    </div>
  );
}

export default App;
