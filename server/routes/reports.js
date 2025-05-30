const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken"); // ADD THIS - was missing!
const Report = require("../models/Report");

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(403).json({ error: "Invalid token." });
  }
};

// POST /reports - Create a new report (public endpoint)
router.post("/", async (req, res) => {
  try {
    const { company, frequency, abuseType, description } = req.body;

    if (!company || !frequency || !abuseType || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const report = new Report({
      company,
      frequency,
      abuseType,
      description,
    });

    await report.save();
    res.status(201).json({ message: "Report submitted successfully" });
  } catch (error) {
    console.error("Error saving report:", error);
    res.status(500).json({ error: "Failed to submit report" });
  }
});

// GET /reports/companies - Fetch all unique companies (admin only)
router.get("/companies", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    const companies = await Report.distinct("company");
    res.status(200).json(companies);
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ error: "Failed to fetch companies" });
  }
});

// GET /reports/company/:company - Fetch all reports for a specific company (admin only)
router.get("/company/:company", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    const reports = await Report.find({ company: req.params.company });
    res.status(200).json(reports);
  } catch (error) {
    console.error("Error fetching reports for company:", error);
    res.status(500).json({ error: "Failed to fetch reports" });
  }
});

// GET /reports/client - Fetch reports for the logged-in client's company
router.get("/client", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "client") {
      return res.status(403).json({ error: "Access denied. Clients only." });
    }

    // Get company from query params or user data
    const company = req.query.company || req.user.company;

    if (!company) {
      return res.status(400).json({ error: "Company information required" });
    }

    const reports = await Report.find({ company: company });
    res.status(200).json(reports);
  } catch (error) {
    console.error("Error fetching client reports:", error);
    res.status(500).json({ error: "Failed to fetch reports" });
  }
});

// GET /reports/:id - Fetch a specific report by ID
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    // For clients, ensure they can only access reports from their company
    if (req.user.role === "client") {
      const company = req.query.company || req.user.company;
      if (report.company !== company) {
        return res.status(403).json({ error: "Access denied." });
      }
    }

    res.status(200).json(report);
  } catch (error) {
    console.error("Error fetching report:", error);
    res.status(500).json({ error: "Failed to fetch report" });
  }
});

module.exports = router;
