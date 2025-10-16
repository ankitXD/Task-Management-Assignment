import { FaEdit, FaTrash, FaClock, FaCheckCircle } from "react-icons/fa";

const TaskItem = ({ task, onEdit, onDelete }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Todo":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (date) => {
    if (!date) return "No due date";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date() && task.status !== "Completed";
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800 flex-1 pr-4">
          {task.title}
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="text-blue-600 hover:text-blue-800 transition p-2"
            title="Edit task"
          >
            <FaEdit size={18} />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="text-red-600 hover:text-red-800 transition p-2"
            title="Delete task"
          >
            <FaTrash size={18} />
          </button>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-gray-600 mb-4 line-clamp-2">{task.description}</p>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
            task.priority
          )}`}
        >
          {task.priority}
        </span>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
            task.status
          )}`}
        >
          {task.status === "In Progress" ? (
            <span className="flex items-center space-x-1">
              <FaClock size={10} />
              <span>{task.status}</span>
            </span>
          ) : task.status === "Completed" ? (
            <span className="flex items-center space-x-1">
              <FaCheckCircle size={10} />
              <span>{task.status}</span>
            </span>
          ) : (
            task.status
          )}
        </span>
      </div>

      {/* Due Date */}
      <div className="flex items-center text-sm">
        <FaClock
          className={`mr-2 ${
            isOverdue(task.dueDate) ? "text-red-500" : "text-gray-400"
          }`}
        />
        <span
          className={
            isOverdue(task.dueDate)
              ? "text-red-500 font-medium"
              : "text-gray-600"
          }
        >
          {formatDate(task.dueDate)}
          {isOverdue(task.dueDate) && " (Overdue)"}
        </span>
      </div>
    </div>
  );
};

export default TaskItem;
