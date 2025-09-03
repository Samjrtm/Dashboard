const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ================== SAMPLE DATA (JSON format) ==================
let dashboardData = {
  removals: [
    { company: "Aahana & Teeyana Co Ltd.", reg: "100 JN 2025", date: "2025-01-01" },
    { company: "Antrix Varun Company Ltd.", reg: "200 FB 2025", date: "2025-02-02" },
    { company: "Blinds.mu Ltd", reg: "300 MR 2025", date: "2025-03-03" }
  ],
  interventions: [
    { company: "BlueMarine Distributions", reg: "400 AP 2025", date: "2025-04-04" },
    { company: "Panagora", reg: "500 MY 2025", date: "2025-05-05" },
    { company: "Deoraj Pallut", reg: "600 JN 2025", date: "2025-06-06" }
  ],
  installations: [
    { company: "Fatehmamode Car Rental", reg: "700 JL 2025", date: "2025-07-07" },
    { company: "Golf Garden Co Ltd", reg: "800 AG 2025", date: "2025-08-08" },
    { company: "Sumo Distribution Ltd", reg: "900 SP 2025", date: "2025-09-09" }
  ],
  remarks: [
    { company: "Fokeerbux Golden Aluminium Ltd", reg: "10000 OC 2025", date: "2025-10-10", type: "Collision", severity: "High", status: "Resolved" },
    { company: "Quincaillerie A1", reg: "11000 NV 2025", date: "2025-11-11", type: "Mechanical Failure", severity: "Medium", status: "In Progress" },
    { company: "Froid Des Mascareignes", reg: "12000 DC 2025", date: "2025-12-12", type: "Battery", severity: "Low", status: "Unresolved" }
  ]
};

// ================== ROUTES ==================

// Get all dashboard data
app.get("/api/dashboard", (req, res) => {
  res.json(dashboardData);
});

// Get specific section (e.g., /api/removals)
app.get("/api/:section", (req, res) => {
  const { section } = req.params;
  if (dashboardData[section]) {
    res.json(dashboardData[section]);
  } else {
    res.status(404).json({ error: "Section not found" });
  }
});

// Add new row to a section
app.post("/api/:section", (req, res) => {
  const { section } = req.params;
  const newRow = req.body;

  if (dashboardData[section]) {
    dashboardData[section].push(newRow);
    res.status(201).json({ message: "Row added", data: newRow });
  } else {
    res.status(404).json({ error: "Section not found" });
  }
});

// ================== SERVER START ==================
const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
