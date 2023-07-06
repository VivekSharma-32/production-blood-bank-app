const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getDonarListController,
  getHospitalListController,
  getOrgListController,
  deleteDonarController,
  deleteHospitalController,
  deleteOrgController,
} = require("../controllers/adminController");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

// Routes

// GET DONAR LIST
router.get(
  "/donar-list",
  authMiddleware,
  adminMiddleware,
  getDonarListController
);

// GET Hospital LIST
router.get(
  "/hospital-list",
  authMiddleware,
  adminMiddleware,
  getHospitalListController
);

// GET Org LIST
router.get("/org-list", authMiddleware, adminMiddleware, getOrgListController);

// DELETE DONAR LIST
router.delete(
  "/delete-donar/:id",
  authMiddleware,
  adminMiddleware,
  deleteDonarController
);

// DELETE HOSPITAL LIST
router.delete(
  "/delete-hospital/:id",
  authMiddleware,
  adminMiddleware,
  deleteHospitalController
);

// DELETE DONAR LIST
router.delete(
  "/delete-org/:id",
  authMiddleware,
  adminMiddleware,
  deleteOrgController
);

module.exports = router;
