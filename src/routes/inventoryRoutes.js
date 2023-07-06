const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createInventoryController,
  getInventoryController,
  getDonarController,
  getHospitalController,
  getOrganisationController,
  getOrganisationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
} = require("../controllers/inventoryController");
const router = express.Router();

// Routes
// ADD INVENTORY || POST
router.post("/create-inventory", authMiddleware, createInventoryController);

// GET ALL BLOOD RECORDS
router.get("/get-inventory", authMiddleware, getInventoryController);

// GET RECENT BLOOD RECORDS
router.get(
  "/get-recent-inventory",
  authMiddleware,
  getRecentInventoryController
);

// GET HOSPITAL BLOOD RECORDS
router.post(
  "/get-inventory-hospital",
  authMiddleware,
  getInventoryHospitalController
);

// GET DONAR RECORDS
router.get("/get-donars", authMiddleware, getDonarController);

// GET HOSPITAL RECORDS
router.get("/get-hospitals", authMiddleware, getHospitalController);

// GET Organisation
router.get("/get-organisation", authMiddleware, getOrganisationController);

// GET Organisation For Hospital
router.get(
  "/get-organisation-for-hospital",
  authMiddleware,
  getOrganisationForHospitalController
);

module.exports = router;
