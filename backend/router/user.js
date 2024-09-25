const express = require("express");
const {
  createUser,
  loginUser,
  updateUser,
  patchUser,
  deleteUser,
} = require("../controllers/user");
const authentication = require("../middleware/authentication");
const isAdmin = require("../middleware/isAdmin");
const { getAllUsers } = require("../controllers/getAllUser");
const { createAdmin, loginAdmin } = require("../controllers/admin");

const router = express.Router();

// User Registration and Login
router.post("/register", createUser);
router.post("/login", loginUser);

// Admin Registration and Login
router.post("/admin/register", createAdmin);
router.post("/admin/login", loginAdmin);

// Protected Routes - Require Authentication
router.get("/:id/profile", authentication, (req, res) => {
  const showDetail = req.query.showDetail;
  const message = `Welcome to profile page, User ${req.user.username}`;
  if (showDetail === "true") res.status(200).json({ message });
});

router.put("/:id/profile", authentication, updateUser);
router.patch("/:id/profile", authentication, patchUser);
router.delete("/:id/profile", authentication, deleteUser);

// Admin-Only Routes
router.get("/admin/dashboard", authentication, isAdmin, (req, res) => {
  res.status(200).json({ message: `Welcome, Admin User: ${req.user.email}` });
});
router.get("/admin/users", authentication, isAdmin, getAllUsers);

module.exports = router;
