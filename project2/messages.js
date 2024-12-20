const uuid = require('crypto').randomUUID;

function makeMessageList() {
  const id1 = uuid();
  const id2 = uuid();

  const messages = {
    [id1]: {
      id: id1,
      username: 'Brett',
      message: 'Hello, everyone!',
      timestamp: new Date().toISOString(),
    },
    [id2]: {
      id: id2,
      username: 'Jia',
      message: 'Welcome!',
      timestamp: new Date().toISOString(),
    },
  };

  const messageList = {};

  messageList.contains = function contains(id) {
    return !!messages[id];
  };

  messageList.getMessages = function getMessages() {
    return Object.values(messages);
  };

  messageList.addMessage = function addMessage(username, message) {
    const id = uuid();
    messages[id] = {
      id,
      username,
      message,
      timestamp: new Date().toISOString(),
    };
    return id;
  };

  messageList.getMessage = function getMessage(id) {
    return messages[id];
  };

  messageList.updateMessage = function updateMessage(id, newContent) {
    if (!messages[id]) return false;
    messages[id].message = newContent || messages[id].message;
    return true;
  };

  messageList.deleteMessage = function deleteMessage(id) {
    delete messages[id];
  };

  return messageList;
}

module.exports = makeMessageList();