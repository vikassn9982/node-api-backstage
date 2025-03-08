const express = require("express");
const logger = require("../config/logger");
const router = express.Router();

router.get("/", (req, res) => {
  logger.info(`Audit log accessed by ${req.ip}`);
  res.json({ message: "Audit logs retrieved" });
});

module.exports = router;
