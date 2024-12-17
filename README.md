# ITicket: Issue Tracking System for Universities

## 📘 Overview

Perguruan tinggi atau universitas adalah tempat mengembangkan diri, menuntut ilmu, dan berinteraksi sosial. Namun, dalam proses ini sering kali muncul permasalahan yang menghambat, seperti informasi yang kurang akurat dan kendala administratif.

ITicket hadir sebagai solusi platform online untuk mempermudah proses pelaporan masalah. Dengan antarmuka yang ramah pengguna, ITicket memungkinkan student melaporkan permasalahan secara online dan memudahkan admin serta handler dalam pengelolaan dan penyelesaian masalah tersebut.

## 🎯 Tujuan Aplikasi

- Efisiensi Pelayanan.
- Transparansi dan Akuntabilitas.
- Meningkatkan Kualitas Layanan Akademik.

## 👥 Target Pengguna

| Role    | Deskripsi Tanggung Jawab                                           |
| ------- | ------------------------------------------------------------------ |
| Admin   | Verifikasi akun student/handler dan mengelola assignment ticket.   |
| Handler | Menangani ticket yang ditugaskan admin dan mengubah status ticket. |
| Student | Membuat akun, melaporkan masalah, dan melacak status tiket mereka. |

## 🚀 Fitur Utama

- **Login & Registrasi**: Akses akun untuk student, admin, dan handler.
- **Pengelolaan Ticket**: Buat, kelola, dan tindak lanjuti laporan masalah.
- **Kategori Laporan**: Pilih kategori untuk memastikan laporan diteruskan ke pihak yang tepat.
- **Dashboard Admin**: Lihat data laporan yang masuk, prioritas serta status.

## 🛠️ Tech Stack

| Kategori                | Teknologi    | Alasan Pemilihan                                                    |
| ----------------------- | ------------ | ------------------------------------------------------------------- |
| **Database**            | MongoDB      | Fleksibilitas dan skalabilitas data non-relasional.                 |
| **ORM**                 | Mongoose     | Memastikan konsistensi data dan validasi skema.                     |
| **Server Framework**    | ExpressJS    | Fleksibilitas dalam membangun backend yang sesuai kebutuhan proyek. |
| **Image Storage**       | Cloudinary   | Solusi image storage berbasis cloud tanpa konfigurasi server rumit. |
| **Frontend**            | ReactJS      | Membangun antarmuka interaktif dan reusable.                        |
| **UI Components**       | Chakra UI    | Pembuatan UI responsif yang modern.                                 |
| **HTTP Client**         | Axios        | Penanganan request asinkron dengan interceptors dan error handling. |
| **Navigation**          | React Router | Navigasi halaman SPA yang mulus dan cepat.                          |
| **Password Encryption** | Bcrypt       | Pengamanan password dengan hashing yang aman.                       |
| **Authentication**      | JWT          | Autentikasi berbasis token yang aman dan efisien.                   |

## 📃 Panduan Penggunaan

- **Admin**: Kelola verifikasi akun dan distribusi tiket ke handler.
- **Handler**: Buat akun, login, dan tangani tiket yang telah diteruskan oleh admin.
- **Student**: Buat akun, login, buat ticket, dan pantau status laporan.

## 💪 Cara Instalasi dan Menjalankan Proyek

Proyek ini terdiri dari dua folder utama: **backend** dan **frontend**. Berikut langkah-langkah untuk menjalankan proyek secara lokal.

### 1. Menjalankan Backend

1. Navigasi ke folder `backend`.
2. Buat file **.env** berdasarkan file **.env.example** berikut:
   ```
   PORT={{PORT}}
   MONGODB_URI={{MONGODB_URI}}
   JWT_SECRET={{JWT_SECRET}}
   JWT_EXPIRES_IN={{JWT_EXPIRES_IN}}
   CLOUDINARY_CLOUD_NAME={{CLOUDINARY_CLOUD_NAME}}
   CLOUDINARY_API_KEY={{CLOUDINARY_API_KEY}}
   CLOUDINARY_API_SECRET={{CLOUDINARY_API_SECRET}}
   ```
3. Jalankan perintah berikut:
   ```bash
   npm install
   npm run seed
   npm run dev
   ```
   Perintah `npm run seed` digunakan untuk mengisi data awal ke dalam database.
   Perintah `npm run dev` digunakan untuk menjalankan server backend.

### 2. Menjalankan Frontend

1. Navigasi ke folder `frontend`.
2. Buat file **.env** berdasarkan file **.env.example** berikut:
   ```
   VITE_API_URL={{VITE_API_URL}}
   ```
3. Jalankan perintah berikut:
   ```bash
   npm install
   npm run dev
   ```
   Perintah ini akan memulai server pengembangan untuk frontend. Akses aplikasi melalui URL berikut: [http://localhost:5173/](http://localhost:5173/).

## 🌐 Dokumentasi API

Untuk dokumentasi API lengkap, silakan akses melalui tautan berikut:
[ITicket API Documentation](https://documenter.getpostman.com/view/37484739/2sAYBa8Uk5)

Dokumentasi ini mencakup semua endpoint yang tersedia dan juga parameter yang bisa digunakan.

## ✨ Tim Pengembang

- [M. Fikri Ansari](https://www.linkedin.com/in/m-fikri-ansari/) - Captain / Fullstack Developer
- [Rifki Ardiansah](https://www.linkedin.com/in/rifki-ardiansah-56658a287) - Co-Captain / Backend Developer
- [Lenida Nathania Ivana Sitorus](https://www.linkedin.com/in/lenida-nathania-ivana-sitorus-475629248) - UI/UX Designer
- [Aqshal Bintang Kurniawan](https://id.linkedin.com/in/aqshal-bintang-kurniawan-569577322) - QA & Documentation Manager

Terima kasih telah menggunakan ITicket! 🚀
