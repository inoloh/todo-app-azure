const TaskDao = require("../models/TaskDao");

 class TaskList {
   /**
    * Handles the various APIs for displaying and managing tasks
    * @param {TaskDao} taskDao
    */
   constructor(taskDao) {
     this.taskDao = taskDao;
   }
   async showTasks(req, res, context) {
     const { isAuthenticated, username } = context;

     const querySpec = {
       query: "SELECT * FROM root r WHERE r.completed=@completed AND r.type=@type",
       parameters: [
         {
           name: "@completed",
           value: false
         },
         {
          name: "@type",
          value: "task"
        }
       ]
     };

     const items = await this.taskDao.find(querySpec);
     res.render("index", {
       title: "My ToDo List ",
       tasks: items,
       isAuthenticated,
       username
     });
   }

   async addTask(req, res) {
     if (!req.session.isAuthenticated) {
      return res.redirect('/auth/signin');
     }
     
     const item = req.body;

     await this.taskDao.addItem(item);
     res.redirect("/");
   }

   async completeTask(req, res) {
     if (!req.session.isAuthenticated) {
      return res.redirect('/auth/signin');
     }

     const completedTasks = Object.keys(req.body);
     const tasks = [];

     completedTasks.forEach(task => {
       tasks.push(this.taskDao.updateItem(task));
     });

     await Promise.all(tasks);

     res.redirect("/");
   }
 }

 module.exports = TaskList;