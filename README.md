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

## Panduan Instalasi

### 1. Persiapan Database
1. Buat database baru di MySQL dengan nama `aksamedia_test`.
2. Import file database yang tersedia di: `/database/aksamedia_test.sql`.
3. Pastikan tabel telah terbuat dengan struktur yang benar.

### 2. Konfigurasi Backend (Laravel)
1. Masuk ke direktori backend.
2. Jalankan `composer install` untuk mengunduh dependencies.
3. Sesuaikan file `.env` (DB_DATABASE, DB_USERNAME, DB_PASSWORD).
4. Jalankan `php artisan storage:link` untuk mengaktifkan akses foto profil.
5. Jalankan `php artisan serve`.

### 3. Konfigurasi Frontend (React)
1. Masuk ke direktori frontend.
2. Jalankan `npm install`.
3. Pastikan konfigurasi API URL mengarah ke server Laravel (default: http://localhost:8000/api).
4. Jalankan `npm run dev`.
**AKUN DEMO**
Username: admin
Password: pastibisa
