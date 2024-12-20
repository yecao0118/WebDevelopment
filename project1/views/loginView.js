function renderLoginPage(errorMessage = '') {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="/login.css">
        <title>Login</title>
      </head>
      <body class="login-page">
        <div class="login-container">
          <h1 class="title">Login</h1>
          ${errorMessage ? `<p class="error-message">${errorMessage}</p>` : ''}
          <form class="login-form" action="/login" method="POST">
            <label class="form-label" for="username">Username:</label>
            <input class="form-input" type="text" id="username" name="username" required>
            <button class="btn" type="submit">Login</button>
          </form>
        </div>
      </body>
      </html>
    `;
}

module.exports = {
  renderLoginPage,
};