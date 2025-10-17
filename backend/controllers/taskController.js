import Task from "../models/Task.js";
import { createTaskSchema, updateTaskSchema } from "../utils/validation.js";

// @desc    Get all tasks for logged-in user
// @route   GET /api/tasks
// @access  Private
export const getTasks = async (req, res, next) => {
  try {
    const { status, priority, search } = req.query;

    // Build filter object
    const filter = { userId: req.user._id };

    if (status) {
      filter.status = status;
    }

    if (priority) {
      filter.priority = priority;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
export const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      const error = new Error("Task not found");
      error.statusCode = 404;
      return next(error);
    }

    // Check if task belongs to user
    if (task.userId.toString() !== req.user._id.toString()) {
      const error = new Error("Not authorized to access this task");
      error.statusCode = 403;
      return next(error);
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
export const createTask = async (req, res, next) => {
  try {
    // Validate input
    const { error, value } = createTaskSchema.validate(req.body);
    if (error) {
      const err = new Error(error.details[0].message);
      err.statusCode = 400;
      return next(err);
    }

    const { title, description, priority, status, dueDate } = value;

    // Check if due date is in the past
    if (dueDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(dueDate);
      selectedDate.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        const error = new Error("Due date cannot be in the past");
        error.statusCode = 400;
        return next(error);
      }
    }

    const task = await Task.create({
      title,
      description,
      priority,
      status,
      dueDate,
      userId: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = async (req, res, next) => {
  try {
    // Validate input
    const { error, value } = updateTaskSchema.validate(req.body);
    if (error) {
      const err = new Error(error.details[0].message);
      err.statusCode = 400;
      return next(err);
    }

    let task = await Task.findById(req.params.id);

    if (!task) {
      const error = new Error("Task not found");
      error.statusCode = 404;
      return next(error);
    }

    // Check if task belongs to user
    if (task.userId.toString() !== req.user._id.toString()) {
      const error = new Error("Not authorized to update this task");
      error.statusCode = 403;
      return next(error);
    }

    // Check if due date is in the past (only if dueDate is being updated)
    if (value.dueDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(value.dueDate);
      selectedDate.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        const error = new Error("Due date cannot be in the past");
        error.statusCode = 400;
        return next(error);
      }
    }

    task = await Task.findByIdAndUpdate(req.params.id, value, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      const error = new Error("Task not found");
      error.statusCode = 404;
      return next(error);
    }

    // Check if task belongs to user
    if (task.userId.toString() !== req.user._id.toString()) {
      const error = new Error("Not authorized to delete this task");
      error.statusCode = 403;
      return next(error);
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get task statistics
// @route   GET /api/tasks/stats
// @access  Private
export const getTaskStats = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const stats = await Task.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          todo: {
            $sum: { $cond: [{ $eq: ["$status", "Todo"] }, 1, 0] },
          },
          inProgress: {
            $sum: { $cond: [{ $eq: ["$status", "In Progress"] }, 1, 0] },
          },
          completed: {
            $sum: { $cond: [{ $eq: ["$status", "Completed"] }, 1, 0] },
          },
          highPriority: {
            $sum: { $cond: [{ $eq: ["$priority", "High"] }, 1, 0] },
          },
          mediumPriority: {
            $sum: { $cond: [{ $eq: ["$priority", "Medium"] }, 1, 0] },
          },
          lowPriority: {
            $sum: { $cond: [{ $eq: ["$priority", "Low"] }, 1, 0] },
          },
        },
      },
    ]);

    const result =
      stats.length > 0
        ? stats[0]
        : {
            total: 0,
            todo: 0,
            inProgress: 0,
            completed: 0,
            highPriority: 0,
            mediumPriority: 0,
            lowPriority: 0,
          };

    // Remove the _id field
    delete result._id;

    res.status(200).json({
      success: true,
      stats: result,
    });
  } catch (error) {
    next(error);
  }
};
