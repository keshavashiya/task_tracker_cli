# Task CLI

Task CLI is a command-line tool for managing tasks. You can add, update, delete, mark tasks as in-progress or done, and list tasks with different statuses https://roadmap.sh/projects/task-tracker.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/keshavashiya/task_tracker_cli
   cd task_tracker_cli
   ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Make the CLI executable globally:
    ```sh
    npm link
    ```

## Usage

- ### Adding a New Task
    To add a new task, use the `add` command followed by the task title:

    ```sh
    task add "Buy groceries"
    # Output: Task added successfully (ID: 1)
    ```

- ### Updating a Task
    To update an existing task, use the `update` command followed by the task ID and the new title:
    ```sh
    task update 1 "Buy groceries and cook dinner"
    # Output: Task updated successfully (ID: 1)
    ```

- ### Deleting a Task
    To delete a task, use the `delete` command followed by the task ID:
    ```sh
    task delete 1
    # Output: Task deleted successfully (ID: 1)
    ```

- ### Marking a Task as In Progress
    To mark a task as in progress, use the `mark-in-progress` command followed by the task ID:
    ```sh
    task mark-in-progress 1
    # Output: Task marked as in progress (ID: 1)
    ```

- ### Marking a Task as Done
    To mark a task as done, use the `mark-done` command followed by the task ID:
    ```sh
    task mark-done 1
    # Output: Task marked as done (ID: 1)
    ```

- ### Listing All Tasks
    To list all tasks, use the `list` command:
    ```sh
    task list
    # Output: [ { id: 1, title: 'Buy groceries', status: 'todo' }, ... ]
    ```

- ### Listing Tasks by Status
    To list tasks by a specific status, use the `list` command followed by the status `(done, todo, in-progress)`:
    ```sh
    task list done
    # Output: [ { id: 1, title: 'Buy groceries', status: 'done' }, ... ]

    task list todo
    # Output: [ { id: 2, title: 'Clean the house', status: 'todo' }, ... ]

    task list in-progress
    # Output: [ { id: 3, title: 'Write report', status: 'in-progress' }, ... ]
    ```

## Project Structure
```sh
task_tracker_cli/
│
├── bin/
│   └── index.js          # Entry point for the CLI
│
├── src/
│   ├── commands/
│   │   ├── commands.js   # Command implementations
│   │   └── tasks.json    # JSON file to store tasks
│   └── logger.js         # Logger implementation
│
│
├── package.json          # Project metadata and dependencies
│
└── README.md             # Project documentation
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## License
This project is licensed under the MIT License.
