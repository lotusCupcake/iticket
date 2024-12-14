# ITicket: Issue Tracking System for Universities

## 📘 **Overview**

Perguruan tinggi atau universitas adalah tempat mengembangkan diri, menuntut ilmu, dan berinteraksi sosial. Namun, dalam proses ini sering kali muncul permasalahan yang menghambat, seperti informasi yang kurang akurat dan kendala administratif.

ITicket hadir sebagai solusi platform online untuk mempermudah proses pelaporan masalah. Dengan antarmuka yang ramah pengguna, ITicket memungkinkan student melaporkan permasalahan secara online dan memudahkan admin serta handler dalam pengelolaan dan penyelesaian masalah tersebut.

## 🎯 **Tujuan Aplikasi**

- Mempermudah pelaporan masalah secara online.
- Meningkatkan efisiensi pengelolaan dan penyelesaian laporan.
- Memberikan pengalaman pengguna yang lebih baik melalui sistem terstruktur.

## 👥 **Target Pengguna**

| **Role**    | **Deskripsi Tanggung Jawab**                                       |
| ----------- | ------------------------------------------------------------------ |
| **Admin**   | Verifikasi akun student/handler dan mengelola assignment ticket.   |
| **Handler** | Menangani ticket yang ditugaskan admin dan mengubah status ticket. |
| **Student** | Membuat akun, melaporkan masalah, dan melacak status tiket mereka. |

## 🚀 **Fitur Utama**

- **Login & Registrasi**: Akses akun untuk student, admin, dan handler.
- **Pengelolaan Ticket**: Buat, kelola, dan tindak lanjuti laporan masalah.
- **Kategori Laporan**: Pilih kategori untuk memastikan laporan diteruskan ke pihak yang tepat.
- **Dashboard Admin**: Lihat data laporan yang masuk, prioritas serta status.

## 🛠️ **Tech Stack**

| **Kategori**            | **Teknologi** | **Alasan Pemilihan**                                                |
| ----------------------- | ------------- | ------------------------------------------------------------------- |
| **Database**            | MongoDB       | Fleksibilitas dan skalabilitas data non-relasional.                 |
| **ORM**                 | Mongoose      | Memastikan konsistensi data dan validasi skema.                     |
| **Server Framework**    | ExpressJS     | Fleksibilitas dalam membangun backend yang sesuai kebutuhan proyek. |
| **Image Storage**       | Cloudinary    | Solusi image storage berbasis cloud tanpa konfigurasi server rumit. |
| **Frontend**            | ReactJS       | Membangun antarmuka interaktif dan reusable.                        |
| **UI Components**       | Chakra UI     | Pembuatan UI responsif yang modern.                                 |
| **HTTP Client**         | Axios         | Penanganan request asinkron dengan interceptors dan error handling. |
| **Navigation**          | React Router  | Navigasi halaman SPA yang mulus dan cepat.                          |
| **Password Encryption** | Bcrypt        | Pengamanan password dengan hashing yang aman.                       |
| **Authentication**      | JWT           | Autentikasi berbasis token yang aman dan efisien.                   |

## 📋 **Panduan Penggunaan**

2. **Admin**: Kelola verifikasi akun dan distribusi tiket ke handler.
3. **Handler**: Buat akun, login, dan tangani tiket yang telah diteruskan oleh admin.
4. **Student**: Buat akun, login, buat ticket, dan pantau status laporan.

## ✨ **Tim Pengembang**

- **M. Fikri Ansari** - Captain / Fullstack Developer
- **Rifki Ardiansah** - Co-Captain / Backend Developer
- **Lenida Nathania Ivana Sitorus** - UI/UX Designer
- **Aqshal Bintang Kurniawan** - QA & Documentation Manager

Terima kasih telah menggunakan ITicket! 🚀
