// require('dotenv').config({ path: '.env.dev' });

// const express = require('express');
// const router = express.Router();
// const { QueueServiceClient } = require("@azure/storage-queue");

// async function getQueueMessage() {
//   const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
//   const queueServiceClient = QueueServiceClient.fromConnectionString(connectionString);
//   const queueClient = queueServiceClient.getQueueClient("quote-queue");

//   const response = await queueClient.receiveMessages();
//   if (response.receivedMessageItems.length > 0) {
//     const msg = response.receivedMessageItems[0];
//     await queueClient.deleteMessage(msg.messageId, msg.popReceipt);
//     return JSON.parse(Buffer.from(msg.messageText, "base64").toString("utf8"));
//   } else {
//     return { message: null };
//   }
// }

// router.get('/getQueueMessage', async (req, res) => {
//   try {
//     const message = await getQueueMessage();
//     res.status(200).json(message);
//   } catch (error) {
//     console.error('Error fetching queue message:', error);
//     res.status(500).json({ error: 'Failed to fetch queue message' });
//   }
// });

// module.exports = router;
