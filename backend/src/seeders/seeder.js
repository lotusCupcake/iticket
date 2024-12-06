require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");
const Category = require("../models/Category");
const Ticket = require("../models/Ticket");
const History = require("../models/History");
const Assignment = require("../models/Assignment");
const { mongodbUri } = require("../config/env");
const ROLES = require("../constant/roles");

const users = [
  {
    name: "Zayn Malik",
    email: "zayn@example.com",
    password: "password123",
    role: ROLES.ADMIN,
    isActive: true,
  },
  {
    name: "Liam Payne",
    email: "liam@example.com",
    password: "password123",
    role: ROLES.ADMIN,
    isActive: true,
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    role: ROLES.HANDLER,
    isActive: true,
  },
  {
    name: "Rifki Ardiansah",
    email: "rifki@example.com",
    password: "password123",
    role: ROLES.HANDLER,
    isActive: true,
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
    password: "password123",
    role: ROLES.STUDENT,
    isActive: true,
  },
  {
    name: "Dono Sudono",
    email: "dono@example.com",
    password: "password123",
    role: ROLES.STUDENT,
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
];

const createTickets = async (userId, categoryId) => {
  const tickets = [
    {
      userId,
      categoryId,
      description: "Tidak Muncul Tagihan",
      priority: "MEDIUM",
      attachment: "laporan.jpg",
      status: "OPEN",
    },
    {
      userId,
      categoryId,
      description: "Terjadi Kerusakan Pintu Toilet",
      priority: "HIGH",
      attachment: "lampiran.jpg",
      status: "OPEN",
    },
  ];

  const createdTickets = await Ticket.create(tickets);

  const histories = createdTickets.map((ticket) => ({
    ticketId: ticket._id,
    status: ticket.status,
    description: ticket.description,
  }));

  await History.create(histories);

  return createdTickets;
};

const createAssignments = async (userId, tickets) => {
  const assignments = tickets.map((ticket) => ({
    userId,
    ticketId: ticket._id,
    resolution: "Harap Segera Menemui Admin di kampus",
  }));

  await Assignment.create(assignments);
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(mongodbUri);
    console.log("Connected to MongoDB");

    await User.deleteMany();
    await Category.deleteMany();
    await Ticket.deleteMany();
    await History.deleteMany();
    await Assignment.deleteMany();

    console.log("Previous data cleared");

    const createdUsers = await User.create(users);

    const createdCategories = await Category.create(categories);

    for (const user of createdUsers) {
      for (const category of createdCategories) {
        const createdTickets = await createTickets(user._id, category._id);
        await createAssignments(user._id, createdTickets);
      }
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

seedDatabase();
