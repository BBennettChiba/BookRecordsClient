import './App.css';
import {useState} from 'react';
import Scan from './Scan.js'
import BookList from './BookList';
import Login from './Login';

function App() {
  const [loggedIn, setloggedIn] = useState(null)
  const [user, setUser] = useState(null);
  const [newUpload, setNewUpload] = useState(null);

  
  return (
    <div className="App">
      {!loggedIn && <Login user={user} setUser={setUser} loggedIn={loggedIn} setloggedIn={setloggedIn}/>}
      {loggedIn && <Scan user={user} newUpload={newUpload} setNewUpload={setNewUpload}/>}
      {loggedIn && <BookList user={user} newUpload={newUpload}/>}
    </div>
  );
}

export default App;
