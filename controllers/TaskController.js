import Task from "../models/Task.js";

export const createTask = async (req, res) => {
    try {
        const task = new Task({
            title: req.body.title,
            description: req.body.description,
        });

        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).render('todo', { tasks: tasks })
    } catch (error) {
        res.status(500).render('error', { message: error.message });
    }
};

export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).json('Task not found!');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                description: req.body.description,
                completed: req.body.completed,
            },
            {
                new: true
            }
        );

        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).json('Task not found!')
        }
    } catch (error) {
        res.status(200).json({ message: error.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (task) {
            res.status(200).json('Task deleted!');
        } else {
            res.status(404).json('Task not found!')
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
