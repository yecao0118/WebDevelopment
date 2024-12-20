import LoginForm from '../components/LoginForm';
import Controls from '../components/Controls';
import './Header.css';

function Header({ username, loginStatus, onLogin, onLogout, onRefresh, onShowProfile }) {
  return (
    <header className="header">
      {loginStatus === 'notLoggedIn' ? (
        <LoginForm onLogin={onLogin} />
      ) : loginStatus === 'loggedIn' ? (
        <div>
          <p>Welcome, {username}!</p>
          <Controls onLogout={onLogout} onRefresh={onRefresh} />
          <button onClick={onShowProfile}>Profile</button>
        </div>
      ) : null}
    </header>
  );
}

export default Header;