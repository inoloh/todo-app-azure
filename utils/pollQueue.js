// // utils/pollQueue.js
// const axios = require('axios');

// async function pollQueue() {
//   try {
//     const response = await axios.get('http://localhost:3000/api/getQueueMessage');
//     const data = response.data;
//     if (data && data.taskName) {
//       const quote = data.overdue ? getOverdueQuote() : getMotivationalQuote();
//       displayQuote(`Well done on completing ${data.taskName}! Here's a quote for you: "${quote}"`);
//     }
//   } catch (error) {
//     console.error('Error fetching queue message:', error);
//   }
// }

// function getOverdueQuote() {
//   const overdueQuotes = [
//     "Better late than never!",
//     "It's never too late to be what you might have been.",
//     "Delayed, but not denied. Keep going!"
//   ];
//   return overdueQuotes[Math.floor(Math.random() * overdueQuotes.length)];
// }

// function getMotivationalQuote() {
//   const motivationalQuotes = [
//     "The secret of getting ahead is getting started.",
//     "Don't watch the clock; do what it does. Keep going.",
//     "Keep your face always toward the sunshine—and shadows will fall behind you."
//   ];
//   return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
// }

// function displayQuote(message) {
//     const popup = document.getElementById('popup');
//     const popupMessage = document.getElementById('popupMessage');
//     popupMessage.innerText = message;
//     popup.classList.remove('hidden');
  
//     document.getElementById('close').onclick = function () {
//       popup.classList.add('hidden');
//     };
//   }

// // Export the polling function and set an interval
// module.exports = {
//   startPolling: function () {
//     setInterval(pollQueue, 5000); // Poll every 5 seconds
//   }
// };
