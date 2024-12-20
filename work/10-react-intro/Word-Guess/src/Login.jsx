import { useState } from 'react';

function Login({ onLogin }) {
  const [loginName, setLoginName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit(e) {

    e.preventDefault();
    const allowedUsers = /^[a-zA-Z0-9]+$/.test(loginName);


    if (loginName === '') {
      setErrorMessage('Username cannot be empty');
    } else if (loginName === 'dog') {
      setErrorMessage('“dog” is not a valid user');
    } else if (!allowedUsers) {
      setErrorMessage('Username can only contain letters and numbers');
    } else {
      setErrorMessage('');
      onLogin(loginName);
    }
  }


  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Username: </span>
          <input className='login-input'
            value={loginName}
            onInput={(e) => setLoginName(e.target.value)}
          />
        </label>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button className="submit-button" type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;