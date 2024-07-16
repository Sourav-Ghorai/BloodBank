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
         message: "User not Found"
      })
    }
     if (req.body.inventoryType === "In" && user.role !== "donar") {
         return res.status(201).send({
           success: false,
           message: "Not a donar account",
         });
     }
    //  if (inventoryType === "Out" && user.role !== "hospital") {
    //    throw new Error("Not a hospital");
    //  }

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
