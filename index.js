const fs = require("fs").promises;
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const writeJsonFile = async (filePath, data) => {
    try {
        const jsonData = JSON.stringify(data, null, 2);
        await fs.writeFile(filePath, jsonData, "utf8");
        console.log("File has been written");
    } catch (err) {
        console.error(`Error writing file to disk: ${err}`);
    }
};

const readJsonFile = async (filePath) => {
    try {
        await fs.access(filePath);
    } catch {
        console.error(`File not found: ${filePath}. Creating a new file.`);
        await writeJsonFile(filePath, []);
        return [];
    }
    try {
        const data = await fs.readFile(filePath, "utf8");
        return JSON.parse(data);
    } catch (err) {
        console.error(`Error reading file from disk: ${err}`);
        return [];
    }
};

rl.on("line", (input) => {
    const [command, ...args] = input.trim().split(" ");

    switch (command) {
        case "exit":
            exit();
            break;
        case "add":
            addTask(args.join(" "));
            break;
        case "update":
            updateTask(parseInt(args[0]), args.slice(1).join(" "));
            break;
        case "delete":
            deleteTask(parseInt(args[0]));
            break;
        case "mark-in-progress":
            updateStatus(parseInt(args[0]), "in-progress");
            break;
        case "mark-done":
            updateStatus(parseInt(args[0]), "done");
            break;
        case "list":
            if (args[0]) {
                listTaskByStatus(args[0]);
            } else {
                listTasks();
            }
            break;
        case "help":
            displayHelp();
            break;
        default:
            console.log(
                `Invalid command: ${command}, type 'help' for a list of available commands`
            );
            break;
    }
});

const exit = () => {
    console.log("Exiting...");
    rl.close();
};

const addTask = async (description) => {
    if (!description) {
        console.error("Description is required to add a task.");
        return;
    }

    const tasks = await readJsonFile("tasks.json");
    const newId = tasks[tasks.length - 1]?.id + 1 || 1;
    const newTask = {
        id: newId,
        description,
        status: "todo",
        createAt: new Date().toISOString(),
        updateAt: new Date().toISOString(),
    };

    tasks.push(newTask);
    await writeJsonFile("tasks.json", tasks);
};

const updateTask = async (id, description) => {
    if (!description) {
        console.error("Description is required to update a task.");
        return;
    }

    const tasks = await readJsonFile("tasks.json");
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) {
        console.error(`Task with id ${id} not found`);
        return;
    }

    tasks[index].description = description;
    tasks[index].updateAt = new Date().toISOString();
    await writeJsonFile("tasks.json", tasks);
};

const deleteTask = async (id) => {
    const tasks = await readJsonFile("tasks.json");
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) {
        console.error(`Task with id ${id} not found`);
        return;
    }

    tasks.splice(index, 1);
    await writeJsonFile("tasks.json", tasks);
};

const updateStatus = async (id, status) => {
    const tasks = await readJsonFile("tasks.json");
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) {
        console.error(`Task with id ${id} not found`);
        return;
    }

    tasks[index].status = status;
    tasks[index].updateAt = new Date().toISOString();
    await writeJsonFile("tasks.json", tasks);
};

const listTasks = async () => {
    const tasks = await readJsonFile("tasks.json");
    console.log(tasks);
};

const listTaskByStatus = async (status) => {
    const tasks = await readJsonFile("tasks.json");
    const filteredTasks = tasks.filter((task) => task.status === status);
    console.log(filteredTasks);
};

const displayHelp = () => {
    console.log(`
Available commands:
  exit                - Exit the application
  add <description>   - Add a new task
  update <id> <desc>  - Update task description
  delete <id>         - Delete a task
  mark-in-progress <id> - Mark task as in-progress
  mark-done <id>      - Mark task as done
  list [status]       - List tasks, optionally filter by status
  help                - Display this help message
`);
};
