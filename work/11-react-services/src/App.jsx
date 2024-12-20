import { useEffect, useState } from 'react';
import Login from './Login';
import Word from './Word';
import Loading from './Loading';
import { fetchSession } from './services';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSession()
      .then((data) => {
        setUsername(data.username);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="app-container">
      {username ? (
        <Word username={username} setUsername={setUsername} />
      ) : (
        <Login setUsername={setUsername} />
      )}
    </div>
  );
}

export default App;
