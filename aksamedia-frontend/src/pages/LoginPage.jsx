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
      setErrorMsg('LOGIN GAGAL: USERNAME ATAU PASSWORD SALAH');
      setTimeout(() => setErrorMsg(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white dark:bg-gray-950 px-6 overflow-x-hidden relative transition-colors duration-300">
      
      {errorMsg && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100]">
          <div className="bg-red-600 text-white px-8 py-3 rounded-lg shadow-xl font-bold text-xs uppercase tracking-widest border border-red-500">
            {errorMsg}
          </div>
        </div>
      )}

      <div className="w-full max-w-sm">
        <header className="text-center mb-16">
          <div className="inline-block p-4 rounded-2xl bg-black dark:bg-white mb-6 shadow-xl">
            <div className="w-8 h-8 flex items-center justify-center">
              <span className="text-white dark:text-black font-black text-2xl tracking-tighter">A</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white uppercase tracking-tighter">Aksamedia</h1>
          <p className="text-gray-400 dark:text-gray-500 mt-2 text-[10px] font-black uppercase tracking-[0.3em]">Manajemen Sumber Daya Manusia</p>
        </header>

        <form onSubmit={handleLogin} className="space-y-10">
          <div className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] ml-1">Username</label>
              <input 
                type="text" 
                placeholder="ADMIN"
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                className="w-full bg-transparent border-b-2 border-gray-100 dark:border-gray-900 py-3 focus:border-black dark:focus:border-white outline-none transition-colors dark:text-white font-medium text-sm placeholder:text-gray-200 dark:placeholder:text-gray-800"
                required 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] ml-1">Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full bg-transparent border-b-2 border-gray-100 dark:border-gray-900 py-3 focus:border-black dark:focus:border-white outline-none transition-colors dark:text-white font-medium text-sm placeholder:text-gray-200 dark:placeholder:text-gray-800"
                required 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-black dark:bg-white text-white dark:text-black font-black py-5 rounded-xl text-[10px] uppercase tracking-[0.3em] transition-all hover:opacity-80 active:scale-[0.98] disabled:opacity-30"
          >
            {loading ? 'MEMPROSES...' : 'SIGN IN'}
          </button>
        </form>

        <footer className="mt-20">
          <p className="text-center text-gray-300 dark:text-gray-700 text-[10px] font-bold uppercase tracking-[0.4em]">
            Edi Wicoro
          </p>
        </footer>
      </div>
    </div>
  );
};

export default LoginPage;