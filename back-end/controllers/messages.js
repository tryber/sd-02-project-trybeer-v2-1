const { message } = require("../services/utils/joinSchemas/ordersSchema");

const { getMessagesForEmail } = require('../models/messages');

const getMessages = async (email) => getMessagesForEmail(email);

module.exports = { getMessages };