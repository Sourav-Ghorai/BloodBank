import inventoryModel from "../models/inventoryModel.js";
import userModel from "../models/userModel.js";

//Create a new inventory
export const createInventoryController = async (req, res) => {
  try {
    const { email, inventoryType } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
   //  if (inventoryType === "In" && user.role !== "donar") {
   //    throw new Error("Not a donar account");
   //  }
    if (inventoryType === "Out" && user.role !== "hospital") {
      throw new Error("Not a hospital");
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
