import { useSearchParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api/axios';

const DashboardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [employees, setEmployees] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [toast, setToast] = useState(null);

  const q = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page')) || 1;

  useEffect(() => {
    fetchData();
  }, [q, page]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get('/employees', {
        params: { 
          name: q, 
          page: page 
        }
      });
      setEmployees(res.data.data.employees);
      setPagination(res.data.pagination);
    } catch (err) {
      showToast("KONEKSI BERMASALAH", "error");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg, type) => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const confirmDelete = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/employees/${selectedId}`);
      setShowModal(false);
      showToast("DATA DIHAPUS", "success");
      fetchData();
    } catch (err) {
      showToast("GAGAL MENGHAPUS", "error");
      setShowModal(false);
    }
  };

  const handleSearch = (keyword) => {
    setSearchParams({ q: keyword, page: 1 });
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.last_page) {
      setSearchParams({ q, page: newPage });
    }
  };

  const getImageUrl = (path) => {
    if (!path) return 'https://via.placeholder.com/150';
    if (path.startsWith('http')) return path;
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
    return `${baseUrl}/storage/${path}`;
  };

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 px-6 py-12 transition-colors duration-300">
      
      {toast && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100]">
          <div className={`${toast.type === 'success' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-red-600 text-white'} px-8 py-3 rounded-lg shadow-xl font-bold text-[10px] tracking-widest uppercase`}>
            {toast.msg}
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-[99] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="relative bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl max-w-sm w-full border border-gray-100 dark:border-gray-800 text-center">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Konfirmasi</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm leading-relaxed">Hapus data pegawai ini secara permanen?</p>
            <div className="flex gap-3">
              <button onClick={handleDelete} className="flex-1 bg-black dark:bg-white text-white dark:text-black font-black py-4 rounded-xl text-[10px] uppercase tracking-widest transition-all active:scale-95">Ya</button>
              <button onClick={() => setShowModal(false)} className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-400 font-black py-4 rounded-xl text-[10px] uppercase tracking-widest transition-all">Batal</button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter dark:text-white uppercase">Daftar Pegawai</h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-2">Sistem Manajemen SDM</p>
          </div>
          <Link to="/employees/create" className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:opacity-80 active:scale-95">
            Tambah Baru
          </Link>
        </header>

        <div className="mb-12">
          <div className="max-w-md">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] ml-1 block mb-3">Pencarian (Enter)</label>
            <input 
              type="text" 
              placeholder="CARI NAMA..." 
              defaultValue={q}
              onKeyUp={(e) => e.key === 'Enter' && handleSearch(e.target.value)}
              className="w-full bg-transparent border-b-2 border-gray-100 dark:border-gray-900 py-3 focus:border-black dark:focus:border-white outline-none transition-colors dark:text-white font-medium text-sm"
            />
          </div>
        </div>

        <div className="w-full overflow-hidden border-t-2 border-gray-50 dark:border-gray-900">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-50 dark:border-gray-900">
                  <th className="py-6 pr-4 text-[10px] uppercase tracking-[0.2em] font-black text-gray-400">Pegawai</th>
                  <th className="py-6 px-4 text-[10px] uppercase tracking-[0.2em] font-black text-gray-400">Divisi</th>
                  <th className="py-6 pl-4 text-[10px] uppercase tracking-[0.2em] font-black text-gray-400 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-900">
                {loading ? (
                  <tr><td colSpan="3" className="py-20 text-center text-[10px] font-black text-gray-300 tracking-widest uppercase">Memuat...</td></tr>
                ) : filteredEmployees.length > 0 ? (
                  filteredEmployees.map((emp) => (
                    <tr key={emp.id} className="group transition-all">
                      <td className="py-8 pr-4">
                        <div className="flex items-center gap-6">
                          <img 
                            src={getImageUrl(emp.image)} 
                            alt={emp.name} 
                            className="w-16 h-16 rounded-2xl object-cover border dark:border-gray-800"
                            onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
                          />
                          <div>
                            <p className="font-bold dark:text-white text-base tracking-tight">{emp.name}</p>
                            <p className="text-gray-400 text-xs mt-1">{emp.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-8 px-4">
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-3 py-1 bg-gray-50 dark:bg-gray-900 rounded-lg">
                          {emp.division.name}
                        </span>
                      </td>
                      <td className="py-8 pl-4 text-right">
                        <div className="flex justify-end gap-6">
                          <Link to={`/employees/edit/${emp.id}`} className="text-[10px] font-black text-gray-400 hover:text-black dark:hover:text-white uppercase tracking-widest transition-colors underline underline-offset-8">Edit</Link>
                          <button onClick={() => confirmDelete(emp.id)} className="text-[10px] font-black text-gray-400 hover:text-red-600 uppercase tracking-widest transition-colors underline underline-offset-8">Hapus</button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="3" className="py-20 text-center text-[10px] font-black text-gray-300 tracking-widest uppercase">Data Tidak Ditemukan</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {pagination.last_page > 1 && (
          <div className="mt-16 flex justify-center items-center gap-12">
            <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 hover:text-black dark:hover:text-white disabled:opacity-0 transition-all">Kembali</button>
            <div className="text-[10px] font-black dark:text-white uppercase tracking-[0.4em]">{page} / {pagination.last_page}</div>
            <button onClick={() => handlePageChange(page + 1)} disabled={page === pagination.last_page} className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 hover:text-black dark:hover:text-white disabled:opacity-0 transition-all">Lanjut</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;