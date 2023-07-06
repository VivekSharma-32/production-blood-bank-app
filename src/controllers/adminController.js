const userModel = require("../models/userModel");

// Get Donar List
const getDonarListController = async (req, res) => {
  try {
    const donarData = await userModel
      .find({ role: "donar" })
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      totalCount: donarData.length,
      message: "Donar List Fetched Successfully !",
      donarData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Donar List API",
      error,
    });
  }
};

// Get Hospital List
const getHospitalListController = async (req, res) => {
  try {
    const hospitalData = await userModel
      .find({ role: "hospital" })
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      totalCount: hospitalData.length,
      message: "Hospital List Fetched Successfully !",
      hospitalData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Hospital List API",
      error,
    });
  }
};

// Get Hospital List
const getOrgListController = async (req, res) => {
  try {
    const orgData = await userModel
      .find({ role: "organisation" })
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      totalCount: orgData.length,
      message: "Organisation List Fetched Successfully !",
      orgData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Organisation List API",
      error,
    });
  }
};

// DELETE Donar
const deleteDonarController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Donar Record Deleted",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Delete Donar API",
      error,
    });
  }
};

// DELETE Donar
const deleteHospitalController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Hospital Record Deleted",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Delete Hospital API",
      error,
    });
  }
};

// DELETE Donar
const deleteOrgController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Org Record Deleted",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Delete Org API",
      error,
    });
  }
};

module.exports = {
  getDonarListController,
  getHospitalListController,
  getOrgListController,
  deleteDonarController,
  deleteHospitalController,
  deleteOrgController,
};
