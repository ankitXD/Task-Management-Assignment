import { useState, useEffect } from "react";
import { taskAPI } from "../../services/api";
import { toast } from "react-toastify";
import TaskFilters from "../Tasks/TaskFilters";
import TaskList from "../Tasks/TaskList";
import TaskForm from "../Tasks/TaskForm";
import {
  FaPlus,
  FaTasks,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    priority: "",
  });

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, [filters]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.search) params.search = filters.search;
      if (filters.status) params.status = filters.status;
      if (filters.priority) params.priority = filters.priority;

      const response = await taskAPI.getTasks(params);
      setTasks(response.data.tasks);
    } catch (error) {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await taskAPI.getStats();
      setStats(response.data.stats);
    } catch (error) {
      console.error("Failed to fetch stats");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      await taskAPI.deleteTask(taskId);
      toast.success("Task deleted successfully!");
      fetchTasks();
      fetchStats();
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleCreateTask = () => {
    setEditingTask(null);
    setShowTaskForm(true);
  };

  const handleCloseForm = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const handleTaskSaved = () => {
    fetchTasks();
    fetchStats();
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      status: "",
      priority: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Stats Cards */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Tasks */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">
                    Total Tasks
                  </p>
                  <p className="text-3xl font-bold mt-2">{stats?.total || 0}</p>
                </div>
                <FaTasks className="text-4xl text-blue-200" />
              </div>
            </div>

            {/* Todo */}
            <div className="bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-100 text-sm font-medium">Todo</p>
                  <p className="text-3xl font-bold mt-2">{stats?.todo || 0}</p>
                </div>
                <FaExclamationCircle className="text-4xl text-gray-200" />
              </div>
            </div>

            {/* In Progress */}
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm font-medium">
                    In Progress
                  </p>
                  <p className="text-3xl font-bold mt-2">
                    {stats?.inProgress || 0}
                  </p>
                </div>
                <FaClock className="text-4xl text-yellow-200" />
              </div>
            </div>

            {/* Completed */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">
                    Completed
                  </p>
                  <p className="text-3xl font-bold mt-2">
                    {stats?.completed || 0}
                  </p>
                </div>
                <FaCheckCircle className="text-4xl text-green-200" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>
          <button
            onClick={handleCreateTask}
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium shadow-md hover:shadow-lg"
          >
            <FaPlus />
            <span>Create Task</span>
          </button>
        </div>

        {/* Filters */}
        <TaskFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />

        {/* Task List */}
        <TaskList
          tasks={tasks}
          loading={loading}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      </div>

      {/* Task Form Modal */}
      {showTaskForm && (
        <TaskForm
          task={editingTask}
          onClose={handleCloseForm}
          onTaskSaved={handleTaskSaved}
        />
      )}
    </div>
  );
};

export default Dashboard;
