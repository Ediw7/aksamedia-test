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
      const res = await api.get(`/employees`, {
        params: { name: q, page: page }
      });
      setEmployees(res.data.data.employees);
      setPagination(res.data.pagination);
    } catch (err) {
      showToast("Gagal memuat data", "error");
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
      showToast("Data berhasil dihapus", "success");
      fetchData();
    } catch (err) {
      showToast("Gagal menghapus data", "error");
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-10 transition-colors duration-300">
      
      {toast && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] animate-bounce">
          <div className={`${toast.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'} text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3`}>
            <span className="font-bold text-sm">{toast.msg}</span>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-[99] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-md" onClick={() => setShowModal(false)}></div>
          <div className="relative bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-2xl max-w-sm w-full border border-gray-100 dark:border-gray-800">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-2xl bg-red-50 dark:bg-red-900/20 mb-6">
                <span className="text-red-600 text-2xl">⚠️</span>
              </div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">Konfirmasi Hapus</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm leading-relaxed">Data yang dihapus tidak dapat dipulihkan kembali. Lanjutkan?</p>
            </div>
            <div className="flex gap-3">
              <button onClick={handleDelete} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-2xl transition-all active:scale-95 shadow-lg shadow-red-500/20">Hapus</button>
              <button onClick={() => setShowModal(false)} className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-bold py-3.5 rounded-2xl hover:bg-gray-200 transition-all">Batal</button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black tracking-tight dark:text-white">Pegawai<span className="text-blue-600">.</span></h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Kelola data SDM Aksamedia</p>
          </div>
          <Link to="/employees/create" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-2xl transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 active:scale-95">
            <span>+ Tambah Baru</span>
          </Link>
        </div>

        <div className="mb-8 group">
          <div className="relative max-w-md transition-all duration-300 focus-within:max-w-lg">
            
            <input 
              type="text" 
              placeholder="Cari nama pegawai..." 
              defaultValue={q}
              onKeyUp={(e) => e.key === 'Enter' && handleSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-900 border-none rounded-2xl shadow-sm dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-[2rem] shadow-sm overflow-hidden border border-gray-100 dark:border-gray-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-50 dark:border-gray-800">
                  <th className="p-6 text-xs uppercase tracking-widest font-bold text-gray-400">Profil</th>
                  <th className="p-6 text-xs uppercase tracking-widest font-bold text-gray-400">Divisi</th>
                  <th className="p-6 text-xs uppercase tracking-widest font-bold text-gray-400 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                {loading ? (
                  <tr><td colSpan="3" className="p-20 text-center text-gray-400 animate-pulse font-medium">Sinkronisasi data...</td></tr>
                ) : employees.length > 0 ? (
                  employees.map((emp) => (
                    <tr key={emp.id} className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-all">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <img src={emp.image} alt="" className="w-14 h-14 rounded-2xl object-cover ring-4 ring-gray-50 dark:ring-gray-800" />
                          <div>
                            <p className="font-bold dark:text-white text-lg">{emp.name}</p>
                            <p className="text-gray-400 text-sm">{emp.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="px-4 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl text-xs font-black uppercase tracking-wider">
                          {emp.division.name}
                        </span>
                      </td>
                      <td className="p-6">
                        <div className="flex justify-center gap-3">
                          <Link to={`/employees/edit/${emp.id}`} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 text-gray-400 hover:text-blue-600 transition-all">✏️</Link>
                          <button onClick={() => confirmDelete(emp.id)} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/30 text-gray-400 hover:text-red-600 transition-all">🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="3" className="p-20 text-center text-gray-400 font-medium">Data tidak ditemukan</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {pagination.last_page > 1 && (
          <div className="mt-10 flex justify-center items-center gap-6">
            <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className="p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm disabled:opacity-30 hover:shadow-md transition-all active:scale-90 dark:text-white">←</button>
            <div className="px-6 py-3 bg-white dark:bg-gray-900 rounded-2xl shadow-sm text-sm font-bold dark:text-white">
              {page} <span className="text-gray-300 mx-2">/</span> {pagination.last_page}
            </div>
            <button onClick={() => handlePageChange(page + 1)} disabled={page === pagination.last_page} className="p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm disabled:opacity-30 hover:shadow-md transition-all active:scale-90 dark:text-white">→</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;