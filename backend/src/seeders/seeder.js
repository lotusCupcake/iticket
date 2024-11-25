require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");
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
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(mongodbUri);

    await User.deleteMany();

    console.log("Previous data cleared");

    const createdUsers = await User.create(users);
    console.log("Users seeded");

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
