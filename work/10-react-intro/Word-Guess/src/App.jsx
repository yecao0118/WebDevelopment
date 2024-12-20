import { useState } from 'react';
import Game from './Game';
import Login from './Login';
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  function onLogin(username) {
    setUsername(username);
    setIsLoggedIn(true);
  }

  function onLogout() {
    setUsername('');
    setIsLoggedIn(false);
  }


  return (
    <div className="app-container">
      {isLoggedIn
        ? <Game
            username={username}
            onLogout={onLogout}
          />
        : <Login
            onLogin={onLogin}
          />
      }
    </div>
  );
}

export default App;
