const userModel = require("../models/userModel");
const inventoryModel = require("../models/inventoryModel");
const { default: mongoose } = require("mongoose");

const createInventoryController = async (req, res) => {
  try {
    const { email } = req.body;
    // validation
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    // if (inventoryType === "in" && user.role !== "donar") {
    //   throw new Error("Not a donar account");
    // }
    // if (inventoryType === "out" && user.role !== "hospital") {
    //   throw new Error("Not a hospital");
    // }

    if (req.body.inventoryType == "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const qunatityOfBlood = req.body.quantity;
      const organisation = new mongoose.Types.ObjectId(req.body.userId);

      // calculate blood quantity
      const totalInOfRequstedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      // console.log("Total in", totalInOfRequstedBlood);
      const totalIn = totalInOfRequstedBlood[0]?.total || 0;
      //Calculate OUT Blood quantity
      const totalOutOfRequstedBloodGroup = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalOut = totalOutOfRequstedBloodGroup[0]?.total || 0;

      // IN and OUT Calc
      const availableQunantityOfBloodGroup = totalIn - totalOut;

      // qunantity validation
      if (availableQunantityOfBloodGroup < qunatityOfBlood) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableQunantityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,
        });
      }
      req.body.hospital = user?._id;
    } else {
      req.body.donar = user?._id;
    }

    // save inventory record
    const inventory = new inventoryModel(req.body);
    await inventory.save();

    return res.status(201).send({
      success: true,
      message: "New blood record added !",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in creating Inventory API",
    });
  }
};

// GET ALL BLOOD RECORDS
const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organisation: req.body.userId,
      })
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      message: "Get all records successfully.",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting Inventory API",
    });
  }
};

// GET HOSPITAL BLOOD RECORDS
const getInventoryHospitalController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find(req.body.filters)
      .populate("donar")
      .populate("hospital")
      .populate("organisation")
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      message: "Get hospital consumer records successfully.",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in consumer Inventory API",
    });
  }
};

// GET BLOOD RECORD OF 3
const getRecentInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organisation: req.body.userId,
      })
      .limit(3)
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      message: "Recent inventory data",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in recent Inventory API",
    });
  }
};

// get donar records
const getDonarController = async (req, res) => {
  try {
    const organisation = req.body.userId;
    const donarId = await inventoryModel.distinct("donar", {
      organisation,
    });
    const donars = await userModel.find({ _id: { $in: donarId } });
    return res.status(200).send({
      success: true,
      message: "Donar record fetched successfully",
      donars,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in fetching donar records",
      error,
    });
  }
};

// GET hospital records controller
const getHospitalController = async (req, res) => {
  try {
    const organisation = req.body.userId;
    // GET HOSPITAL ID
    const hospitalId = await inventoryModel.distinct("hospital", {
      organisation,
    });
    // HOSPITAL
    const hospitals = await userModel.find({ _id: { $in: hospitalId } });
    return res.status(200).send({
      success: true,
      message: "Hospital records fetched successfully !",
      hospitals,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in GET hospital API",
      error,
    });
  }
};

const getOrganisationController = async (req, res) => {
  try {
    //Todo
    const donar = req.body.userId;
    const orgId = await inventoryModel.distinct("organisation", { donar });
    // find org
    const organisations = await userModel.find({ _id: { $in: orgId } });

    return res.status(200).send({
      success: true,
      message: "Org data fetched successfully",
      organisations,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Organisation API",
      error,
    });
  }
};

const getOrganisationForHospitalController = async (req, res) => {
  try {
    //Todo
    const hospital = req.body.userId;
    const orgId = await inventoryModel.distinct("organisation", { hospital });
    // find org
    const organisations = await userModel.find({ _id: { $in: orgId } });

    return res.status(200).send({
      success: true,
      message: "Hospital Org data fetched successfully",
      organisations,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Hospital Organisation API",
      error,
    });
  }
};

module.exports = {
  createInventoryController,
  getInventoryController,
  getDonarController,
  getHospitalController,
  getOrganisationController,
  getOrganisationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
};
