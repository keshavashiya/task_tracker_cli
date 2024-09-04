const fs = require('fs').promises;
const path = require('path');

const getLogger = (() => {
  let loggerInstance = null;

  return async () => {
    if (!loggerInstance) {
      const { default: loggerFactory } = await import('../logger.js');
      loggerInstance = loggerFactory('commands');
    }
    return loggerInstance;
  };
})();

const TASKS_FILE = path.resolve(__dirname, 'tasks.json');

async function readTasks() {
  try {
    const data = await fs.readFile(TASKS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return [];
    }
    throw err;
  }
}

async function writeTasks(tasks) {
  await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2), 'utf8');
}

module.exports = {
  async add(title) {
    const logger = await getLogger();
    if (!title) {
      logger.error('Title is required');
      return;
    }
    const tasks = await readTasks();
    const task = { id: tasks.length + 1, title, status: 'todo' };
    tasks.push(task);
    await writeTasks(tasks);
    console.log(`Task added successfully (ID: ${task.id})`);
  },

  async update(taskId, title) {
    const logger = await getLogger();
    if (!taskId || !title) {
      logger.error('Task ID and title are required');
      return;
    }
    const tasks = await readTasks();
    const task = tasks.find(t => t.id === parseInt(taskId));
    if (!task) {
      logger.error('Task not found');
      return;
    }
    task.title = title;
    await writeTasks(tasks);
    console.log(`Task updated successfully (ID: ${task.id})`);
  },

  async delete(taskId) {
    const logger = await getLogger();
    if (!taskId) {
      logger.error('Task ID is required');
      return;
    }
    const tasks = await readTasks();
    const taskIndex = tasks.findIndex(t => t.id === parseInt(taskId));
    if (taskIndex === -1) {
      logger.error('Task not found');
      return;
    }
    tasks.splice(taskIndex, 1);
    await writeTasks(tasks);
    console.log(`Task deleted successfully (ID: ${taskId})`);
  },

  async markInProgress(taskId) {
    const logger = await getLogger();
    if (!taskId) {
      logger.error('Task ID is required');
      return;
    }
    const tasks = await readTasks();
    const task = tasks.find(t => t.id === parseInt(taskId));
    if (!task) {
      logger.error('Task not found');
      return;
    }
    task.status = 'in-progress';
    await writeTasks(tasks);
    console.log(`Task marked as in progress (ID: ${task.id})`);
  },

  async markDone(taskId) {
    const logger = await getLogger();
    if (!taskId) {
      logger.error('Task ID is required');
      return;
    }
    const tasks = await readTasks();
    const task = tasks.find(t => t.id === parseInt(taskId));
    if (!task) {
      logger.error('Task not found');
      return;
    }
    task.status = 'done';
    await writeTasks(tasks);
    logger.debug(`Task marked as done (ID: ${task.id})`);
  },

  async list(status) {
    const tasks = await readTasks();
    if (status) {
      const filteredTasks = tasks.filter(t => t.status === status);
      console.log(filteredTasks);
    } else {
      console.log(tasks);
    }
  }
};
