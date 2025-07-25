// routes/auth.js or similar
const express = require("express");
const router = express.Router();

// Logout route
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true, // Use true if using HTTPS
    sameSite: "None", // For cross-site requests
  });
  return res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
