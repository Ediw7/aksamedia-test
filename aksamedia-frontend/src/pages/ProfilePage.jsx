import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [name, setName] = useState(user?.name || '');
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    
    const updatedUser = { ...user, name: name };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    alert('Profil berhasil diperbarui!');
    
    
    window.location.href = '/'; 
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Pengaturan Profil</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Lengkap</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
            placeholder="Masukkan nama baru..."
            required
          />
        </div>
        <div className="pt-2">
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition shadow-lg">
            Simpan Perubahan
          </button>
          <button type="button" onClick={() => navigate('/')} className="w-full mt-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 font-medium">
            Kembali ke Dashboard
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;