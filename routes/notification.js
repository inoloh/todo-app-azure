const express = require('express');
const router = express.Router();
const signalRHub = require('../utils/signalRHub');

router.post('/sendNotification', async (req, res) => {
  const { userId, taskName, overdue } = req.body;
  const message = { userId, taskName, overdue, quote: overdue ? getOverdueQuote() : getMotivationalQuote() };
    
  await signalRHub.sendMessage('newMessage', message);
  res.sendStatus(200);
});

function getOverdueQuote() {
  return "Better late than never!";
}

function getMotivationalQuote() {
  return "The secret of getting ahead is getting started.";
}

module.exports = router;
