// This object has methods that produce HTML
// - These methods are passed data used to produce the HTML
// - In this case, they are passed the model

const chatWeb = {
  // chatPage() returns the HTML for the page
  // it calls the other methods to generate the HTML for different sections
  chatPage: function (chat) {
    return `
      <!doctype html>
      <html>
        <head>
          <title>Chat</title>
          <link rel="stylesheet" href="/style.css">
        </head>
        <body>
          <div id="chat-app">
            <div class="users-section">
              <h2>Users</h2>
              ${chatWeb.getUserList(chat)}
            </div>
            <div class="messages-section">
              <h2>Messages</h2>
              ${chatWeb.getMessageList(chat)}
            </div>
            <div class="outgoing-section">
              ${chatWeb.getOutgoingSection(chat)}
            </div>
          </div>
        </body>
      </html>
  `;
  },

  getMessageList: function (chat) {
    return `<ol class="messages">` +
      chat.messages.map(message => `
      <li class="message">
        <div class="sender-info">
          <div class="avatar">
            <img src="/images/avatar-${message.sender.toLowerCase()}.jpg" alt="${message.sender}" class="avatar-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
          <div class="avatar-placeholder" style="display:none;">
            ${message.sender.charAt(0).toUpperCase()}
          </div>
        </div>
        <p class="message-text">${message.text}</p>
      </li>
    `).join('') +
      '</ol>';
    // Generate the HTML for the list of messages
  },
  getUserList: function (chat) {
    // This is a bit of a complex structure
    // Lookup Object.values() in MDN
    // .map() generates a new array based on calling the callback
    // on each element of the array
    // So this .map() converts the user names to an array of HTML
    // and .join() converts the array of HTML into a single HTML string
    return `<ul class="users">` +
      Object.values(chat.users).map(user => `
      <li>
        <div class="user">
          <div class="avatar">
          <img src="/images/avatar-${user.toLowerCase()}.jpg" alt="${user}" class="avatar-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
          <div class="avatar-placeholder" style="display:none;">
            ${user.charAt(0).toUpperCase()}
          </div>
        </div>
          <span class="username">${user}</span>
        </div>
      </li>
    `).join('') +
      `</ul>`;
  },
  getOutgoingSection: function () {
    return ` 
      <form action="/chat" method="POST" class="outgoing">
        <input type="hidden" name="username" value="Ye Cao" class="username-field">
        <input type="text" name="text" placeholder="Enter your message" required class="message-field">
        <button type="submit" class="submit-button">Send</button>
      </form>
    `;
    // Generate the HTML for a form to send a message
  }
};
module.exports = chatWeb;
