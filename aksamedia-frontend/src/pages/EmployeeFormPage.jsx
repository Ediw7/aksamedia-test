import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';

const EmployeeFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [divisions, setDivisions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    division: '',
    position: '',
    image: null
  });

  useEffect(() => {
    fetchDivisions();
    if (id) fetchEmployeeDetail();
  }, [id]);

  const showToast = (msg, type) => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchDivisions = async () => {
    try {
      const res = await api.get('/divisions');
      setDivisions(res.data.data.divisions);
    } catch (err) {
      showToast("Koneksi API bermasalah", "error");
    }
  };

  const fetchEmployeeDetail = async () => {
    try {
      const res = await api.get(`/employees?name=`); 
      const emp = res.data.data.employees.find(e => e.id === id);
      if (emp) {
        setFormData({
          ...formData,
          name: emp.name,
          phone: emp.phone,
          division: emp.division.id,
          position: emp.position
        });
        setImagePreview(emp.image);
      }
    } catch (err) {
      showToast("Data tidak ditemukan", "error");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('phone', formData.phone);
    data.append('division', formData.division);
    data.append('position', formData.position);
    if (formData.image) data.append('image', formData.image);

    try {
      if (id) {
        data.append('_method', 'PUT');
        await api.post(`/employees/${id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await api.post('/employees', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      showToast(id ? "Data diperbarui" : "Berhasil disimpan", "success");
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      showToast("Gagal memproses data", "error");
    } finally {
      setLoading(false);
    }
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
            {id ? 'Edit Data' : 'Tambah Pegawai'}
          </h1>
        </header>

        <form onSubmit={handleSubmit} className="space-y-12">
          
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Foto Profil</label>
            <div className="flex items-center gap-8">
              <div className="w-24 h-24 rounded-2xl bg-gray-50 dark:bg-gray-900 border-2 border-dashed border-gray-200 dark:border-gray-800 flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[10px] text-gray-400 font-bold uppercase">Kosong</span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="cursor-pointer bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded text-xs font-bold uppercase tracking-wider hover:opacity-80 transition-opacity inline-block text-center">
                  Pilih Berkas
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
                <p className="text-[10px] text-gray-400 font-medium">Format: JPG, PNG. Maksimal 2MB.</p>
              </div>
            </div>
          </div>

          <div className="grid gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Nama Lengkap</label>
              <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-transparent border-b-2 border-gray-100 dark:border-gray-900 py-3 focus:border-black dark:focus:border-white outline-none transition-colors dark:text-white font-medium" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Telepon / WhatsApp</label>
              <input type="text" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-transparent border-b-2 border-gray-100 dark:border-gray-900 py-3 focus:border-black dark:focus:border-white outline-none transition-colors dark:text-white font-medium" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2 flex flex-col">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Divisi</label>
                <select required value={formData.division} onChange={(e) => setFormData({...formData, division: e.target.value})}
                  className="w-full bg-transparent border-b-2 border-gray-100 dark:border-gray-900 py-3 focus:border-black dark:focus:border-white outline-none transition-colors dark:text-white font-medium appearance-none cursor-pointer">
                  <option value="" className="dark:bg-gray-950">Pilih</option>
                  {divisions.map(div => <option key={div.id} value={div.id} className="dark:bg-gray-950">{div.name}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Jabatan</label>
                <input type="text" required value={formData.position} onChange={(e) => setFormData({...formData, position: e.target.value})}
                  className="w-full bg-transparent border-b-2 border-gray-100 dark:border-gray-900 py-3 focus:border-black dark:focus:border-white outline-none transition-colors dark:text-white font-medium" />
              </div>
            </div>
          </div>

          <div className="pt-10">
            <button type="submit" disabled={loading}
              className="w-full bg-black dark:bg-white text-white dark:text-black font-black py-5 rounded text-xs uppercase tracking-[0.3em] hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-30">
              {loading ? 'Memproses...' : 'Simpan Data'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeFormPage;