import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [errorMsg, setErrorMsg] = useState(null);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null); 
    
    try {
      const res = await api.post('/login', { username, password });
      localStorage.setItem('token', res.data.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.data.user));
      navigate('/');
    } catch (err) {
    
      setErrorMsg('Login gagal! Username atau Password salah.');
      

      setTimeout(() => setErrorMsg(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 overflow-x-hidden relative">

      {errorMsg && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] animate-bounce">
          <div className="bg-red-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-red-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-semibold text-sm">{errorMsg}</span>
            <button onClick={() => setErrorMsg(null)} className="ml-2 hover:opacity-70">✕</button>
          </div>
        </div>
      )}

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block p-3 rounded-2xl bg-blue-600 mb-4 shadow-lg shadow-blue-500/20">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 3c1.708 0 3.29.423 4.677 1.17l.04.023M12 11c0-3.517 1.009-6.799 2.753-9.571m-3.44 2.04l-.054.09A10.003 10.003 0 0112 21c-1.708 0-3.29-.423-4.677-1.17l-.04-.023" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Aksamedia</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm font-medium">Manajemen Karyawan Modern</p>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm p-6 sm:p-10 transition-all">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 ml-1">Username</label>
              <input 
                type="text" 
                className="w-full px-4 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="admin"
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 ml-1">Password</label>
              <input 
                type="password" 
                className="w-full px-4 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="••••••••"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all duration-300 flex items-center justify-center shadow-lg shadow-blue-500/20 active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Masuk'}
            </button>
          </form>
        </div>

        <p className="text-center mt-10 text-gray-400 dark:text-gray-600 text-xs uppercase tracking-[0.2em] font-bold">
          {localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name : 'Edi Wicoro'}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;