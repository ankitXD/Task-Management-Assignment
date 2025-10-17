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

    // Get today's date at midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get due date at midnight
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);

    // Task is overdue if due date is before today and not completed
    return due < today && task.status !== "Completed";
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-3 md:p-4 border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-start mb-2 md:mb-3">
        <h3 className="text-base md:text-lg font-semibold text-gray-800 flex-1 pr-2 break-words">
          {task.title}
        </h3>
        <div className="flex space-x-1 flex-shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="text-blue-600 hover:text-blue-800 transition p-1 md:p-1.5 hover:bg-blue-50 rounded cursor-pointer"
            title="Edit task"
          >
            <FaEdit size={14} className="md:w-4 md:h-4" />
          </button>
          <button
            onClick={() => onDelete(task)}
            className="text-red-600 hover:text-red-800 transition p-1 md:p-1.5 hover:bg-red-50 rounded cursor-pointer"
            title="Delete task"
          >
            <FaTrash size={14} className="md:w-4 md:h-4" />
          </button>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3 line-clamp-2 break-words">
          {task.description}
        </p>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 md:gap-2 mb-2 md:mb-3">
        <span
          className={`px-2 md:px-2.5 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-medium border ${getPriorityColor(
            task.priority
          )}`}
        >
          {task.priority}
        </span>
        <span
          className={`px-2 md:px-2.5 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-medium border ${getStatusColor(
            task.status
          )}`}
        >
          {task.status === "In Progress" ? (
            <span className="flex items-center space-x-1">
              <FaClock size={8} />
              <span>{task.status}</span>
            </span>
          ) : task.status === "Completed" ? (
            <span className="flex items-center space-x-1">
              <FaCheckCircle size={8} />
              <span>{task.status}</span>
            </span>
          ) : (
            task.status
          )}
        </span>
      </div>

      {/* Due Date */}
      <div className="flex items-center text-[11px] md:text-xs">
        <FaClock
          className={`mr-1 md:mr-1.5 flex-shrink-0 ${
            isOverdue(task.dueDate) ? "text-red-500" : "text-gray-400"
          }`}
          size={10}
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
