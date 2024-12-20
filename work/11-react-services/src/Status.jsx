import { MESSAGES } from './constants';

function Status({ error }) {
  const message = MESSAGES[error] || MESSAGES.default;
  return (
    <div className="status">
      {error && <p className="error-msg">{message}</p>}
    </div>
  );
}

export default Status;