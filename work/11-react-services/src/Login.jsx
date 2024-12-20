import { useState } from 'react';
import { fetchLogin } from './services';
import Status from './Status';

function Login({ setUsername }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');
    fetchLogin(input)
      .then((data) => setUsername(data.username))
      .catch((err) => setError(err.error));
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter username"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <Status error={error} />
    </div>
  );
}

export default Login;