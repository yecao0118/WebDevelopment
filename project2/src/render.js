function render({ state, appEl }) {
  const html = `
    <main>
      ${generateStatusHtml(state)}
      ${generateLoginHtml(state)}
      ${generateChatHtml(state)}
    </main>
  `;
  appEl.innerHTML = html;
}

function generateStatusHtml(state) {
  return state.error ? `<div class="status error">${state.error}</div>` : '';
}

function generateLoginHtml(state) {
  if (state.isLoggedIn) {
    return '';
  }
  if (state.isLoginPending) {
    return `
      <div class="login__waiting">Loading user...</div>
    `;
  }
  return `
    <div class="login">
      <h2 class="login__title">Login</h2>
      <form class="login__form" action="#login">
        <label>
          <span>Username:</span>
          <input class="login__username" type="text" value="${state.loginInputValue || ''}">
        </label>
        <button class="login__button" type="submit">Login</button>
      </form>
    </div>
  `;
}

function generateChatHtml(state) {
  if (!state.isLoggedIn) return '';
  
  const messagesHtml = state.messages.map(msg => {
    const isUserMessage = msg.username === state.username;
    return `
      <div class="message">
        <span class="message__username">${msg.username}:</span> ${msg.message}
        ${isUserMessage ? `<button class="message__delete" data-id="${msg.id}">Delete</button>` : ''}
      </div>
    `;
  }).join('');

  return `
    <div class="chat">
      ${generateAllUserListHtml(state)}
      ${generateUserListHtml(state)}
      <div class="messages">
        <div class="message__title">This is the group for Info6150. Let's chat!</div>
        <div class="messages__content">${messagesHtml}</div>
      </div>
      ${generateAddMessageHtml(state)}
      ${generateControlsHtml(state)}
    </div>
  `;
}

function generateUserListHtml(state) {
  if (!state.users || state.users.length === 0) {
    return '<div class="user-list">No users online</div>';
  }

  const usersHtml = state.users.map(user => `
    <span class="user__name">${user}</span>
  `).join(', ');

  return `
    <div class="user-list">
      <span>Hi, ${state.username}</span>
    </div>
  `;
}

function generateAllUserListHtml(state) {
  if (!state.allUsers || state.allUsers.length === 0) {
    return '<div class="all-user-list">No users have logged in yet</div>';
  }

  const onlineUsers = new Set(state.users);

  const allUsersHtml = state.allUsers.map(user => {
    const isOnline = onlineUsers.has(user);
    return `
      <div class="all-user">
        <span class="all-user__name">${user} ${isOnline ? '(online)' : '(offline)'}</span>
      </div>
    `;
  }).join('');

  return `
    <div class="all-user-list">
      <h3>All Users</h3>
      ${allUsersHtml}
    </div>
  `;
}

function generateControlsHtml(state) {
  return `
    <div class="controls">
      <button class="controls__logout">Logout</button>
    </div>
  `;
}

function generateAddMessageHtml(state) {
  return `
    <form class="message__form" action="#send">
      <label for="message__input">
        <input id="message__input" class="message__input" type="text" placeholder="Type a message..." value="${state.messageInputValue || ''}">
      </label>
      <button type="submit" class="message__button">Send</button>
    </form>
  `;
}

export default render;