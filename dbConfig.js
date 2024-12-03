require('dotenv').config({ path: '.env.dev' });

const config = {};

config.host = process.env.HOST;
config.authKey = process.env.AUTH_KEY
config.databaseId = "ToDoList";
config.containerId = "Items";

if (config.host.includes("https://localhost:")) {
  console.log("Local environment detected");
  console.log("WARNING: Disabled checking of self-signed certs. Do not have this code in production.");
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  console.log(`Go to http://localhost:${process.env.PORT || '3000'} to try the sample.`);
}

module.exports = config;

// const { getSecret } = require('./utils/secretsManager');

// async function getConfig() {
//     const config = {};

//     config.host = await getSecret('COSMOS-HOST');
//     config.authKey = await getSecret('COSMOS-AUTH-KEY');
//     config.databaseId = "ToDoList";
//     config.containerId = "Items";

//     if (config.host.includes("https://localhost:")) {
//       console.log("Local environment detected");
//       console.log("WARNING: Disabled checking of self-signed certs. Do not have this code in production.");
//       process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
//       console.log(`Go to http://localhost:${process.env.PORT || '3000'} to try the sample.`);
//     }

//     return config;
// }

// module.exports = getConfig;
