import { FaExclamationTriangle } from "react-icons/fa";

const DeleteConfirmModal = ({ taskTitle, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Icon */}
        <div className="bg-red-50 p-6 flex justify-center">
          <div className="bg-red-100 rounded-full p-3">
            <FaExclamationTriangle className="text-red-600 text-3xl md:text-4xl" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
            Delete Task?
          </h3>
          <p className="text-gray-600 mb-1 text-sm md:text-base">
            Are you sure you want to delete
          </p>
          <p className="text-gray-800 font-semibold mb-4 text-sm md:text-base break-words">
            "{taskTitle}"
          </p>
          <p className="text-gray-500 text-xs md:text-sm">
            This action cannot be undone.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 p-6 pt-0">
          <button
            onClick={onCancel}
            className="w-full sm:w-1/2 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium text-sm md:text-base cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="w-full sm:w-1/2 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium text-sm md:text-base cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
