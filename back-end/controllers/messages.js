const { getMessagesForEmail, postNewMessage, getAllMessages } = require('../models/messages');

const getMessages = async (email) => getMessagesForEmail(email);

const saveMessage = async ({ message, yourUser }) => postNewMessage(message, yourUser);

const getAll = async (_req, res) => res.status(200).json({ messages: await getAllMessages() });

module.exports = { getMessages, saveMessage, getAll };
