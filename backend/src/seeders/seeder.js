require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");
const Category = require("../models/Category");
const { mongodbUri } = require("../config/env");
const ROLES = require("../constant/roles");

const users = [
  {
    name: "Zayn Malik",
    email: "zayn@example.com",
    password: "password123", // In production, don't use plain text passwords
    role: ROLES.ADMIN,
    isActive: true,
  },
  {
    name: "Liam Payne",
    email: "liam@example.com",
    password: "password123", // In production, don't use plain text passwords
    role: ROLES.ADMIN,
    isActive: true,
  },
];

const categories = [
  {
    name: "Fasilitas Kampus",
    description:
      "Kerusakan Gedung, Keamanan, Kebersihan, Jaringan dan Teknologi",
  },
  {
    name: "Akademik",
    description: "Materi Kuliah, Jadwal Kuliah, Sistem Pembelajaran",
  },
  {
    name: "Administrasi",
    description: "Pendaftaran Mata Kuliah, Transkrip Nilai, Pengajuan Izin",
  },
  {
    name: "Kegiatan Kampus",
    description: "Acara Kampus, Organisasi Mahasiswa",
  },
  {
    name: "Kesehatan dan Kesejahteraan",
    description: "Layanan Kesehatan, Dukungan Kesejahteraan Mahasiswa",
  },
  {
    name: "Transportasi",
    description: "Layanan Transportasi Kampus, Aksesibilitas Gedung",
  },
]; // Removed the extra comma here

const seedDatabase = async () => {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(mongodbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    // Clear existing data for users and categories
    await User.deleteMany();
    console.log("Previous users cleared");

    await Category.deleteMany(); // This should now work if Category is a valid Mongoose model
    console.log("Previous categories cleared");

    // Create users
    const createdUsers = await User.create(users);
    console.log("Users seeded:", createdUsers);

    // Create categories
    const createdCategories = await Category.insertMany(categories);
    console.log("Categories seeded:", createdCategories);

    // Successfully seeded
    console.log("Database seeded successfully!");

    // Exit the process
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
