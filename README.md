# Aksamedia Internship Batch 4

Sistem Manajemen Karyawan (CMS) sederhana yang dibangun untuk memenuhi Technical Test Internship Program di PT Aksamedia Mulia Digital. Proyek ini mencakup fitur autentikasi, manajemen data karyawan (CRUD), pencarian, dan sistem paginasi.

## 🛠 Tech Stack

**Frontend:**
- React.js (Vite)
- Tailwind CSS
- Axios (Integrasi API)
- React Router DOM (Routing & Protected Routes)

**Backend:**
- Laravel (REST API)
- MySQL (Database)

## Fitur Utama

- **Autentikasi**: Login & Logout dengan Token-based Authentication.
- **Dashboard Karyawan**: Menampilkan daftar pegawai dengan foto profil dan informasi divisi.
- **Manajemen Pegawai**: Tambah, Edit, dan Hapus data pegawai beserta unggah foto.
- **Pencarian & Filter**: Mencari data pegawai berdasarkan nama secara real-time.
- **Paginasi**: Navigasi data antar halaman yang efisien.

## 📦 Cara Instalasi

### 1. Persiapan Backend (Laravel)
1. Clone repository ini.
2. Masuk ke folder backend: `cd aksamedia-api`.
3. Install dependencies: `composer install`.
4. Salin file environment: `cp .env.example .env`.
5. Buat database baru di MySQL dengan nama `aksamedia_db`.
6. Konfigurasi `.env` (DB_DATABASE, DB_USERNAME, DB_PASSWORD).
7. Jalankan migrasi & seeders: `php artisan migrate --seed`.
8. Jalankan server: `php artisan serve`.
9. Link storage: `php artisan storage:link`.

### 2. Persiapan Frontend (React)
1. Masuk ke folder frontend: `cd aksamedia-frontend`.
2. Install dependencies: `npm install`.
3. Buat file `.env` di root folder frontend:
   ```env
   VITE_API_BASE_URL=http://localhost:8000
   VITE_API_URL=http://localhost:8000/api
4. Jalankan aplikasi: npm run dev

**AKUN DEMO**
Username: admin
Password: pastibisa
