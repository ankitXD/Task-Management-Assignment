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
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 md:p-6 border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-start mb-3 md:mb-4">
        <h3 className="text-lg md:text-xl font-semibold text-gray-800 flex-1 pr-2 md:pr-4 break-words">
          {task.title}
        </h3>
        <div className="flex space-x-1 md:space-x-2 flex-shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="text-blue-600 hover:text-blue-800 transition p-1.5 md:p-2 hover:bg-blue-50 rounded"
            title="Edit task"
          >
            <FaEdit size={16} className="md:w-[18px] md:h-[18px]" />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="text-red-600 hover:text-red-800 transition p-1.5 md:p-2 hover:bg-red-50 rounded"
            title="Delete task"
          >
            <FaTrash size={16} className="md:w-[18px] md:h-[18px]" />
          </button>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4 line-clamp-2 break-words">
          {task.description}
        </p>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
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
      <div className="flex items-center text-xs md:text-sm">
        <FaClock
          className={`mr-1.5 md:mr-2 flex-shrink-0 ${
            isOverdue(task.dueDate) ? "text-red-500" : "text-gray-400"
          }`}
          size={12}
        />
        <span
          className={`${
            isOverdue(task.dueDate)
              ? "text-red-500 font-medium"
              : "text-gray-600"
          } break-words`}
        >
          {formatDate(task.dueDate)}
          {isOverdue(task.dueDate) && " (Overdue)"}
        </span>
      </div>
    </div>
  );
};

export default TaskItem;
