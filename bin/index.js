#!/usr/bin/env node
const arg = require("arg");

(async () => {
  try {
    const chalk = await import("chalk");
    const commands = (await import("../src/commands/commands.js")).default;

    // Parse positional arguments
    const args = arg({}, { permissive: true });
    const [command, ...commandArgs] = args._; // Extract command and remaining arguments

    // Map CLI command to function names
    const commandMap = {
      "mark-in-progress": "markInProgress",
      "mark-done": "markDone",
      add: "add",
      update: "update",
      delete: "delete",
      list: "list",
    };

    // Execute the appropriate command
    if (command && commands[commandMap[command]]) {
      await commands[commandMap[command]](...commandArgs);
    } else {
      usage(chalk);
    }
  } catch (e) {
    console.error(e.message);
    console.log();
    const chalk = await import("chalk");
    usage(chalk);
  }

  function usage(chalk) {
    console.log(`
${chalk.default.whiteBright("Usage: task [COMMAND] [ARGS]")}
Commands:
  ${chalk.default.greenBright("add <title>")}\t\tCreate new Task
  ${chalk.default.greenBright("update <id> <title>")}\tUpdate existing Task
  ${chalk.default.greenBright("delete <id>")}\t\tDelete existing Task
  ${chalk.default.greenBright(
    "mark-in-progress <id>"
  )}\tMark task as in progress
  ${chalk.default.greenBright("mark-done <id>")}\tMark task as done
  ${chalk.default.greenBright("list")}\t\t\tList all tasks
  ${chalk.default.greenBright(
    "list <status>"
  )}\t\tList tasks by status (done, todo, in-progress)
    `);
  }
})();
