import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

const Navbar = ({ theme, setTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const userData = localStorage.getItem('user');
  const user = userData && userData !== "undefined" ? JSON.parse(userData) : null;

  const handleLogout = async () => {
    try {
      await api.post('/logout');
      localStorage.clear();
      navigate('/login');
    } catch (err) {
      localStorage.clear();
      navigate('/login');
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-xl font-bold dark:text-white">Aksamedia CMS</Link>
      
      <div className="flex items-center gap-4">
        {/* Toggle Dark Mode Button (Tugas 1) */}
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-sm"
        >
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>

        {/* Dropdown User (Tugas 1) */}
        <div className="relative">
          <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 dark:text-white">
            <span className="hidden sm:block font-medium">{user?.name}</span>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
              {user?.name?.charAt(0)}
            </div>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded shadow-xl overflow-hidden">
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white">Edit Profil</Link>
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900 text-red-600 dark:text-red-400 border-t dark:border-gray-600">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;