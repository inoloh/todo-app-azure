const CosmosClient = require('@azure/cosmos').CosmosClient
const express = require('express');

const config = require('../dbConfig')
const TaskList = require('./tasklist')
const TaskDao = require('../models/TaskDao')

// const getConfig = require('../dbConfig')
// const config = getConfig();

const router = express.Router();

const cosmosClient = new CosmosClient({
  endpoint: config.host,
  key: config.authKey
})

const taskDao = new TaskDao(cosmosClient, config.databaseId, config.containerId)
const taskList = new TaskList(taskDao)

taskDao
  .init(err => {
    console.error(err)
  })
  .catch(err => {
    console.error(err)
    console.error(
      'Shutting down because there was an error setting up the database.'
    )
    process.exit(1)
  })

router.get('/', (req, res, next) => {
 taskList.showTasks(req, res, { 
   isAuthenticated: req.session.isAuthenticated,
   username: req.session.account?.username, 
 }).catch(next);
});

router.post('/addtask', (req, res, next) => 
  taskList.addTask(req, res).catch(next)
)

router.post('/completetask', (req, res, next) =>
  taskList.completeTask(req, res).catch(next)
)

module.exports = router;
