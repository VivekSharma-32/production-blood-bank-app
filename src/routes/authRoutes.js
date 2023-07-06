const express = require("express");
const {
  registerController,
  loginController,
  currentUserController,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

// routing object
const router = express.Router();

// routes

router.post("/register", registerController);

// LOGIN ROUTE || POST
router.post("/login", loginController);

// GET CURRENT USER
router.get("/current-user", authMiddleware, currentUserController);

module.exports = router;
