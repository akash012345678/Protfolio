const getStoredMessages = () => {
  const stored = localStorage.getItem('messages');
  if (!stored) {
    return [];
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return [];
  }
};

const saveMessages = (messages) => {
  localStorage.setItem('messages', JSON.stringify(messages));
};

export const sendMessage = async (messageData) => {
  // Simulate network dispatch delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const { name, email, subject, message } = messageData;
  if (!name || !email || !subject || !message) {
    throw new Error('All fields are required');
  }

  const messages = getStoredMessages();
  const newMessage = {
    _id: 'msg_' + Math.random().toString(36).substr(2, 9),
    name,
    email,
    subject,
    message,
    createdAt: new Date().toISOString()
  };

  messages.unshift(newMessage);
  saveMessages(messages);
  return { message: 'Message sent successfully!', data: newMessage };
};

export const getMessages = async () => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return getStoredMessages();
};

export const deleteMessage = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 400));
  const messages = getStoredMessages();
  const filtered = messages.filter(m => m._id !== id);
  saveMessages(filtered);
  return { message: 'Message removed successfully' };
};
