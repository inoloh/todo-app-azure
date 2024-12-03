// how to run, cd to utils and run with
// node updateDatabase.js

require('dotenv').config({ path: '../.env.dev' });

const { CosmosClient } = require('@azure/cosmos');
const cosmosClient = new CosmosClient({
    endpoint: process.env.HOST,
    key: process.env.AUTH_KEY
  })

const database = cosmosClient.database('ToDoList');
const container = database.container('Items');

async function updateExistingTasks() {
  const querySpec = {
    query: "SELECT * FROM c WHERE NOT IS_DEFINED(c.type)"
  };

  const { resources: tasks } = await container.items.query(querySpec).fetchAll();

  for (const task of tasks) {
    task.type = "task";
    await container.item(task.id, task.userId).replace(task);
  }

  console.log(`Updated ${tasks.length} tasks`);
}

updateExistingTasks().catch(console.error);
