import './App.css';
import {useState} from 'react';
import Scan from './Scan.js'
import BookList from './BookList';

function App() {
  const [loggedIn, setloggedIn] = useState(null)
  const [user, setUser] = useState(null);

  const postHeader = {method: "POST", headers: {'Content-Type': "application/json"}}
  // const getHeader = {method: "GET", headers: {'Content-Type': "application/json"}}
  const handleSignIn = async ()=>{
    let request = postHeader;
    let lastName = document.getElementById('last').value
    let firstName = document.getElementById('first').value
    let username = document.getElementById('username').value
    let password = document.getElementById('password').value
    let body = {lastName, firstName, password, username}
    request.body = JSON.stringify(body);
    const authenticate = await fetch('http://localhost:4000/user', request)
    console.log(authenticate);
  }
  const handleLogin = async () =>{
    let request = postHeader
    let username = document.getElementById('Lusername').value
    let password = document.getElementById('Lpassword').value
    let body = JSON.stringify({username, password})
    request.body = body;
    const login = await fetch('http://localhost:4000/login', request)
    console.log(login.status);
    if (login.status === 200) {
      setUser(username);
      setloggedIn(true)}
    else {setloggedIn(false)}
  }
  return (
    <div className="App">
      {!loggedIn && 
      <div>
        <input type="text" id='last'></input>last Name
      <input type="text" id='first'></input>first Name
      <input type="text" id='username'></input>Username
      <input type="text" id='password'></input>Password
      <button onClick={handleSignIn}>Sign up</button>
      </div>}
      {!loggedIn && <div>
      <input type="text" id='Lusername'></input>Username
      <input type="text" id='Lpassword'></input>Password
      <button onClick={handleLogin}>Login</button>
      </div>}
      {loggedIn && <Scan user={user}/>}
      {loggedIn && <BookList user={user}/>}
    </div>
  );
}

export default App;
