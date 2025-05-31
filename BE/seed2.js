const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
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

const seedClientUser = async () => {
  try {
    // Clear existing users with role "client" (optional, remove if you don't want to clear)
    await User.deleteMany({ role: "client" });

    // Create a test client user with hashed password
    const clientUser = [
      {
        email: "client2@vortex.com",
        password: await bcrypt.hash("clientpass456", 10),
        role: "client",
        company: "Company B", // Adding a company as required for client role
      },
    ];

    await User.insertMany(clientUser);
    console.log("Client user seeded successfully");
  } catch (error) {
    console.error("Error seeding client user:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedClientUser();
