import mongoose from "mongoose";
import inventoryModel from "../models/inventoryModel.js";
import userModel from "../models/userModel.js";

//Create a new inventory
export const createInventoryController = async (req, res) => {
  try {
    const { email, bloodGroup, quantity } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(201).send({
        success: false,
        message: "User not Found",
      });
    }
    if (req.body.inventoryType === "In" && user.role !== "donar") {
      return res.status(201).send({
        success: false,
        message: "Not a donar account",
      });
    }
    if (req.body.inventoryType === "Out" && user.role !== "hospital") {
      return res.status(201).send({
        success: false,
        message: "Not a hospital account",
      });
    }

    if (req.body.inventoryType === "Out") {
      const requestedBloodGroup = bloodGroup;
      const requestedQuantityOfBloodGroup = quantity;
      const organization = new mongoose.Types.ObjectId(req.body.userId);

      //Calculate In blood quantity
      const totalInOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organization,
            inventoryType: "In",
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
      const totalIn = totalInOfRequestedBlood[0]?.total || 0;

      //Calculate Out blood quantity
      const totalOutOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organization,
            inventoryType: "Out",
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
      const totalOut = totalOutOfRequestedBlood[0]?.total || 0;

      //In and out calculation
      const availableBloodQuantity = totalIn - totalOut;

      //Quantity validation
      if (availableBloodQuantity < requestedQuantityOfBloodGroup) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableBloodQuantity}ml of ${requestedBloodGroup.toUpperCase()} is available`,
        });
      }
      req.body.hospital = user?._id;
    } else {
      req.body.donar = user?._id;
    }

    const inventory = new inventoryModel(req.body);
    await inventory.save();

    res.status(201).send({
      success: true,
      message: "Inventory created successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating new inventory",
      error,
    });
  }
};

//Get inventory
export const getInventoryController = async (req, res) => {
  try {
    //  console.log(req.body);
    const inventory = await inventoryModel
      .find({ organization: req.body.userId })
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 });
    res.status(201).send({
      success: true,
      message: "Got all inventory successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting inventory",
      error,
    });
  }
};

//Get Donars
export const getDonarController = async (req, res) => {
  try {
    const organization = req.body.userId;

    // Fetch distinct donor IDs based on the organization
    const donarIds = await inventoryModel.distinct("donar", { organization });

    // Ensure donarIds is not undefined or null
    if (!donarIds || donarIds.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No donors found for the given organization",
      });
    }

    // Fetch donor details from userModel using the distinct donor IDs
    const donars = await userModel.find({ _id: { $in: donarIds } });
    // console.log("Donors:", donars);

    return res.status(200).send({
      success: true,
      message: "Donor Record Fetched Successfully",
      donars,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send({
      success: false,
      message: "Error in getting donors",
      error,
    });
  }
};

//Get hospitals
export const getHospitalController = async (req, res) => {
  try {
    const organization = req.body.userId;

    //fetching hospital id
    const hospitalId = await inventoryModel.distinct("hospital", {
      organization,
    });

    // Ensure donarIds is not undefined or null
    if (!hospitalId || hospitalId.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No hospital found for the given organization",
      });
    }

    const hospitals = await userModel.find({ _id: { $in: hospitalId } });

    return res.status(200).send({
      success: true,
      message: "Hospital Record Fetched Successfully",
      hospitals,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send({
      success: false,
      message: "Error in getting hospitals",
      error,
    });
  }
};

//Get Organizations
export const getOrganizationController = async (req, res) => {
   try {
      const donar = req.body.userId;

      //fetching Organization id
      const orgId = await inventoryModel.distinct("organization", {
        donar,
      });

      // Ensure donarIds is not undefined or null
      if (!orgId || orgId.length === 0) {
        return res.status(404).send({
          success: false,
          message: "No organizations found for the given organization",
        });
      }

      const organizations = await userModel.find({ _id: { $in: orgId } });

      return res.status(200).send({
        success: true,
        message: "Hospital Record Fetched Successfully",
        organizations,
      });
   } catch (error) {
      console.log("Error:", error);
      res.status(500).send({
        success: false,
        message: "Error in getting Organizations",
        error,
      });
   }
};
