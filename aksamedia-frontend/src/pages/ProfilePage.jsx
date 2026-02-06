import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const userData = localStorage.getItem('user');
  const user = userData && userData !== "undefined" ? JSON.parse(userData) : null;
  
  const [name, setName] = useState(user?.name || '');
  const [toast, setToast] = useState(null);

  const showToast = (msg, type) => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    
    const updatedUser = { ...user, name: name };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    showToast("PROFIL DIPERBARUI", "success");
    
    setTimeout(() => {
      window.location.href = '/';
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 px-6 py-12 transition-colors">
      
      {toast && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100]">
          <div className={`${toast.type === 'success' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-red-600 text-white'} px-8 py-3 rounded-lg shadow-xl font-bold text-xs uppercase tracking-widest`}>
            {toast.msg}
          </div>
        </div>
      )}

      <div className="max-w-xl mx-auto">
        <header className="mb-12">
          <button onClick={() => navigate('/')} className="text-gray-400 hover:text-black dark:hover:text-white transition-colors mb-4 text-xs font-bold uppercase tracking-widest">
            Kembali
          </button>
          <h1 className="text-3xl font-bold tracking-tighter dark:text-white uppercase">
            Pengaturan Profil
          </h1>
        </header>

        <form onSubmit={handleUpdate} className="space-y-12">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Nama Lengkap Anda</label>
            <input 
              type="text" 
              required 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent border-b-2 border-gray-100 dark:border-gray-900 py-3 focus:border-black dark:focus:border-white outline-none transition-colors dark:text-white font-medium" 
            />
          </div>

          <div className="pt-10 space-y-4">
            <button 
              type="submit"
              className="w-full bg-black dark:bg-white text-white dark:text-black font-black py-5 rounded text-xs uppercase tracking-[0.3em] hover:opacity-90 transition-all active:scale-[0.98]"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;