import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import EmployeeFormPage from './pages/EmployeeFormPage';
import Navbar from './components/Navbar';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');

  useEffect(() => {
    const root = window.document.documentElement;
    
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
     
      if (theme === 'dark' || (theme === 'system' && darkQuery.matches)) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    applyTheme();
    localStorage.setItem('theme', theme);

    
    darkQuery.addEventListener('change', applyTheme);
    return () => darkQuery.removeEventListener('change', applyTheme);
  }, [theme]);

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Router>
        <Routes>

          <Route path="/login" element={<LoginPage />} />

         
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Navbar theme={theme} setTheme={setTheme} />
                <DashboardPage />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/employees/create" 
            element={
              <ProtectedRoute>
                <Navbar theme={theme} setTheme={setTheme} />
                <EmployeeFormPage />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/employees/edit/:id" 
            element={
              <ProtectedRoute>
                <Navbar theme={theme} setTheme={setTheme} />
                <EmployeeFormPage />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Navbar theme={theme} setTheme={setTheme} />
                <ProfilePage />
              </ProtectedRoute>
            } 
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;