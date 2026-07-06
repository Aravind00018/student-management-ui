import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <div className="flex gap-6">
        <Link to="/" className="hover:text-blue-200 font-medium">Students</Link>
        <Link to="/blog" className="hover:text-blue-200 font-medium">Blog</Link>
        {user && (
          <Link to="/create-post" className="hover:text-blue-200 font-medium">
            Write Post
          </Link>
        )}
      </div>
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span className="text-blue-200 text-sm">👤 {user.username}</span>
            <button
              onClick={handleLogout}
              className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded text-sm">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login"
              className="hover:text-blue-200 text-sm">Login</Link>
            <Link to="/register"
              className="bg-white text-blue-600 hover:bg-blue-50 px-3 py-1 rounded text-sm font-medium">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;