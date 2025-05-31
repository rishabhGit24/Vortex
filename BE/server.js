const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const reportRoutes = require("./routes/reports");
const authRoutes = require("./routes/auth");
const jwt = require("jsonwebtoken");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// JWT verification middleware (for future protected routes)
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add decoded user data to request
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid token." });
  }
};

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/reports", reportRoutes);
app.use("/login", authRoutes);

// Example of a protected route (for future use)
// app.get('/admin-data', authenticateToken, (req, res) => {
//   if (req.user.role !== 'admin') {
//     return res.status(403).json({ error: 'Access denied. Admins only.' });
//   }
//   res.json({ message: 'Admin data' });
// });

app.get("/client-data", authenticateToken, (req, res) => {
  if (req.user.role !== "client") {
    return res.status(403).json({ error: "Access denied. Clients only." });
  }
  res.json({ message: "Client data" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
