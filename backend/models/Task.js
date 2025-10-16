import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    priority: {
      type: String,
      enum: {
        values: ["Low", "Medium", "High"],
        message: "{VALUE} is not a valid priority",
      },
      default: "Medium",
    },
    status: {
      type: String,
      enum: {
        values: ["Todo", "In Progress", "Completed"],
        message: "{VALUE} is not a valid status",
      },
      default: "Todo",
    },
    dueDate: {
      type: Date,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  },
);

// Index for faster queries by userId
taskSchema.index({ userId: 1 });

// Index for filtering by status and priority
taskSchema.index({ status: 1, priority: 1 });

const Task = mongoose.model("Task", taskSchema);

export default Task;
