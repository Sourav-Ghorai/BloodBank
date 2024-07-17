import mongoose from "mongoose";
import inventoryModel from "../models/inventoryModel.js";

export const getBloodGroupDetailsController = async (req, res) => {
  try {
    const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    const bloodGroupData = [];
    const organization = new mongoose.Types.ObjectId(req.body.userId);

    await Promise.all(
      bloodGroups.map(async (bloodGroup) => {
        //Count total in
        const totalIn = await inventoryModel.aggregate([
          {
            $match: {
              bloodGroup: bloodGroup,
              inventoryType: "In",
              organization,
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$quantity" },
            },
          },
        ]);
        //Count total out
        const totalOut = await inventoryModel.aggregate([
          {
            $match: {
              bloodGroup: bloodGroup,
              inventoryType: "Out",
              organization,
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$quantity" },
            },
          },
        ]);
        //Count available blood
        const availableBlood =
          (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);
        bloodGroupData.push({
          bloodGroup,
          totalIn: totalIn[0]?.total || 0,
          totalOut: totalOut[0]?.total || 0,
          availableBlood,
        });
      })
    );
     return res.status(200).send({
       success: true,
       message: "Blood Group Data Fetch Successfully",
       bloodGroupData,
     });
  } catch (error) {
    console.log(error);
    return res.status(501).send({
      success: false,
      message: "Error in finding Blood group details",
      error,
    });
  }
};
