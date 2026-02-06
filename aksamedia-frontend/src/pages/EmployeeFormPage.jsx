import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';

const EmployeeFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [divisions, setDivisions] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const fetchDivisions = async () => {
    const res = await api.get('/divisions');
    setDivisions(res.data.data.divisions);
  };

  const fetchEmployeeDetail = async () => {
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
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">
        {id ? 'Edit Karyawan' : 'Tambah Karyawan'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-300">Foto Pegawai</label>
          <input type="file" accept="image/*" 
            onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
          />
        </div>
        <input type="text" placeholder="Nama Lengkap" required
          value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        
        <input type="text" placeholder="Nomor Telepon" required
          value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />

        <select required value={formData.division} 
          onChange={(e) => setFormData({...formData, division: e.target.value})}
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <option value="">Pilih Divisi</option>
          {divisions.map(div => <option key={div.id} value={div.id}>{div.name}</option>)}
        </select>

        <input type="text" placeholder="Jabatan" required
          value={formData.position} onChange={(e) => setFormData({...formData, position: e.target.value})}
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />

        <div className="flex gap-4 pt-4">
          <button type="submit" disabled={loading}
            className="flex-1 bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50">
            {loading ? 'Menyimpan...' : 'Simpan Data'}
          </button>
          <button type="button" onClick={() => navigate('/')}
            className="flex-1 bg-gray-200 text-gray-700 p-3 rounded-lg font-bold hover:bg-gray-300">
            Batal
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeFormPage;