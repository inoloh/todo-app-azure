require('dotenv').config({ path: '../.env.dev' });
const axios = require('axios');


async function getUserProfile(accessToken) {
  const graphUrl = process.env.GRAPH_API_ENDPOINT;
  const url = `${graphUrl}v1.0/me`;

  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
  
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error.response ? error.response.data : error.message);
    throw error;
  }
}


module.exports = { getUserProfile };

