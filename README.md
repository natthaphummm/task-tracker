# Task Tracker

A simple command-line task tracker application. https://roadmap.sh/projects/task-tracker

## Features

-   Add a new task
-   Update an existing task
-   Delete a task
-   Mark a task as in-progress
-   Mark a task as done
-   List all tasks or filter by status
-   Display help message

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/natthaphummm/task-tracker.git
    ```
2. Navigate to the project directory:
    ```sh
    cd task-tracker
    ```
3. Install dependencies:
    ```sh
    npm install
    ```

## Usage

Run the application:

```sh
node index.js
```

### Available Commands

-   `exit` - Exit the application
-   `add <description>` - Add a new task
-   `update <id> <desc>` - Update task description
-   `delete <id>` - Delete a task
-   `mark-in-progress <id>` - Mark task as in-progress
-   `mark-done <id>` - Mark task as done
-   `list [status]` - List tasks, optionally filter by status
-   `help` - Display the help message

### Examples

Add a new task:

```sh
add Finish the project documentation
```

Update an existing task:

```sh
update 1 Update the project documentation
```

Delete a task:

```sh
delete 1
```

Mark a task as in-progress:

```sh
mark-in-progress 1
```

Mark a task as done:

```sh
mark-done 1
```

List all tasks:

```sh
list
```

List tasks by status:

```sh
list done
```

Display help message:

```sh
help
```
