import userModel from "../models/userModel.js";

//Get Donar List
export const getDonarListController = async (req, res) => {
  try {
    const list = await userModel
      .find({ role: "donar" })
      .sort({ createdAt: -1 });
    return res.status(201).send({
      success: true,
      length: list.length,
      message: "Donar list data fetched Successfully",
      list,
    });
  } catch (error) {
    console.log(error);
    res.status(501).send({
      success: false,
      message: "Error in getting donar list",
      error,
    });
  }
};

export const getHospitalListController = async (req, res) => {
  try {
    const list = await userModel
      .find({ role: "hospital" })
      .sort({ createdAt: -1 });
    return res.status(201).send({
      success: true,
      length: list.length,
      message: "Hospital list data fetched Successfully",
      list,
    });
  } catch (error) {
    console.log(error);
    res.status(501).send({
      success: false,
      message: "Error in getting hospital list",
      error,
    });
  }
};

export const getOrganizationListController = async (req, res) => {
  try {
    const list = await userModel
      .find({ role: "organization" })
      .sort({ createdAt: -1 });
    return res.status(201).send({
      success: true,
      length: list.length,
      message: "Organization list data fetched Successfully",
      list,
    });
  } catch (error) {
    console.log(error);
    res.status(501).send({
      success: false,
      message: "Error in getting organization list",
      error,
    });
  }
};

//Delete donar
export const deleteDonarController = async(req, res) => {
   try {
      await userModel.findByIdAndDelete(req.params.id)
      return res.status(200).send({
         success: true,
         message: "Record has been deleted successfully",
      })
   } catch (error) {
      console.log(error);
      res.status(501).send({
        success: false,
        message: "Error in deleting donar",
        error,
      });
   }
}