import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaTasks, FaSignOutAlt, FaUser } from "react-icons/fa";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3 md:py-4">
          {/* Logo/Brand */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-white hover:text-blue-100 transition"
          >
            <FaTasks className="text-xl md:text-2xl" />
            <span className="text-lg md:text-xl font-bold">TaskManager</span>
          </Link>

          {/* User Menu */}
          {isAuthenticated && (
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="flex items-center space-x-2 text-white">
                <FaUser className="text-sm" />
                <span className="font-medium text-sm md:text-base truncate max-w-[120px] md:max-w-none">
                  {user?.name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 md:space-x-2 bg-white text-blue-600 px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-blue-50 transition font-medium text-sm md:text-base"
              >
                <FaSignOutAlt />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;