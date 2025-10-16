import { FaSearch, FaTimes } from "react-icons/fa";

const TaskFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  const hasActiveFilters = filters.status || filters.priority || filters.search;

  return (
    <div className="bg-white rounded-lg shadow-md p-3 md:p-4 mb-3 md:mb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3">
        {/* Search */}
        <div className="sm:col-span-2">
          <label className="block text-[11px] md:text-xs font-medium text-gray-700 mb-1.5">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400 text-xs" />
            </div>
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleChange}
              className="w-full pl-8 pr-3 py-1.5 md:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Search tasks..."
            />
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-[11px] md:text-xs font-medium text-gray-700 mb-1.5">
            Status
          </label>
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="w-full px-2.5 md:px-3 py-1.5 md:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="">All Status</option>
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div>
          <label className="block text-[11px] md:text-xs font-medium text-gray-700 mb-1.5">
            Priority
          </label>
          <select
            name="priority"
            value={filters.priority}
            onChange={handleChange}
            className="w-full px-2.5 md:px-3 py-1.5 md:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <div className="mt-3 flex justify-center sm:justify-end">
          <button
            onClick={onClearFilters}
            className="flex items-center space-x-1.5 text-xs md:text-sm text-gray-600 hover:text-gray-800 transition px-3 py-1.5 hover:bg-gray-50 rounded-lg"
          >
            <FaTimes className="text-xs" />
            <span>Clear Filters</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskFilters;
