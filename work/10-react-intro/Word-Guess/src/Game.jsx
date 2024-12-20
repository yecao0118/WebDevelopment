import { useState } from 'react';
import { comparison } from './comparison';

function Game({ username, onLogout }) {
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const secretWord = 'RECAT';

  function handleGuessSubmit(e) {
    e.preventDefault();
    
    if (guess === '') {
      setMessage('Guess cannot be empty');
    } else if (guess.length !== 5) {
      setMessage(`${guess} is not a valid 5-letter word`);
    } else if (guess.toUpperCase() === secretWord) {
      setMessage(`${guess} is the secret word!`);
    } else {
      const lettersInCommon = comparison(guess.toUpperCase(), secretWord);
      setMessage(`${guess} has ${lettersInCommon} letters in common`);
    }
    
    setGuess('');
  }

  return (
    <div className="game-form">
      <h2>Welcome, {username}!</h2>
      <form onSubmit={handleGuessSubmit}>
        <label>
          <span>Enter a 5-letter word:</span>
          <input className='guess-input'
            value={guess}
            onInput={(e) => setGuess(e.target.value)}
            maxLength={5}
          />
        </label>
        {message && <p className="message">{message}</p>}
        <button className="submit-button" type="submit">Submit</button>
      </form>
      <button className="submit-button" onClick={onLogout}>Logout</button>
    </div>
  );
}

export default Game;