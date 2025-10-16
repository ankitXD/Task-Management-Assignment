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
      <div className="container mx-auto px-3 md:px-4">
        <div className="flex justify-between items-center py-2.5 md:py-3">
          {/* Logo/Brand */}
          <Link
            to="/"
            className="flex items-center space-x-1.5 md:space-x-2 text-white hover:text-blue-100 transition"
          >
            <FaTasks className="text-lg md:text-xl" />
            <span className="text-base md:text-lg font-bold">TaskManager</span>
          </Link>

          {/* User Menu */}
          {isAuthenticated && (
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="flex items-center space-x-1.5 md:space-x-2 text-white">
                <FaUser className="text-xs md:text-sm" />
                <span className="font-medium text-xs md:text-sm truncate max-w-[100px] md:max-w-none">
                  {user?.name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 md:space-x-1.5 bg-white text-blue-600 px-2.5 py-1.5 md:px-3 md:py-2 rounded-lg hover:bg-blue-50 transition font-medium text-xs md:text-sm"
              >
                <FaSignOutAlt className="text-xs" />
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
