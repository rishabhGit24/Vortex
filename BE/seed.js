const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt"); // Add bcrypt for password hashing
const User = require("./models/user");

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB for seeding"))
  .catch((err) => console.error("MongoDB connection error:", err));

const seedUsers = async () => {
  try {
    // Clear existing users
    await User.deleteMany({});

    // Create test users with hashed passwords
    // We need to hash passwords manually since we're using insertMany
    // which bypasses the pre-save middleware
    const users = [
      { 
        email: "admin@vortex.com", 
        password: await bcrypt.hash("admin123", 10), 
        role: "admin" 
      },
      { 
        email: "client@vortex.com", 
        password: await bcrypt.hash("client123", 10), 
        role: "client" 
      },
    ];

    await User.insertMany(users);
    console.log("Test users seeded successfully");
  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedUsers();
