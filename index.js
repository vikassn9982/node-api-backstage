require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const winston = require("./src/config/logger");

const app = express();
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());

const userRoutes = require("./src/routes/userRoutes");

const auditRoutes = require("./src/routes/auditRoutes");

app.use("/api/users", userRoutes);

app.use("/api/audit", auditRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => winston.info(`✅ Server running on port ${PORT}`));
