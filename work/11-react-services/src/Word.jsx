import { useEffect, useState } from 'react';
import {
  fetchWord,
  fetchUpdateWord,
  fetchLogout,
} from './services';
import Status from './Status';

function Word({ username, setUsername }) {
  const [word, setWord] = useState('');
  const [newWord, setNewWord] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWord()
      .then((data) => setWord(data.word))
      .catch((err) => setError(err.error));
  }, []);

  const handleUpdateWord = () => {
    setError('');
    fetchUpdateWord(newWord)
      .then((data) => {
        setWord(data.word);
        setNewWord('');
      })
      .catch((err) => setError(err.error));
  };

  const handleLogout = () => {
    fetchLogout()
      .then(() => setUsername(''))
      .catch((err) => setError(err.error));
  };

  return (
    <div className="word-container">
      <div className="header">
        <h2>Welcome, {username}</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <p>
        Your stored word:{' '}
        <strong>{word || 'No word stored'}</strong>
      </p>
      <input
        type="text"
        placeholder="Enter new word"
        value={newWord}
        onChange={(e) => setNewWord(e.target.value)}
      />
      <button onClick={handleUpdateWord}>Update Word</button>
      <Status error={error} />
    </div>
  );
}

export default Word;