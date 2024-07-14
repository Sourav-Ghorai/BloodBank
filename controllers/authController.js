import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Register Controller
export const registerController = async (req, res) => {
  try {
    //Finding user if exist
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User already exist",
      });
    }

    //Bcrypting password
    const salt = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    //Saving the current user
    const user = new userModel(req.body);
    await user.save();
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server error in registering user",
      error,
    });
  }
};

//Login Controller
export const loginController = async (req, res) => {
  try {
   //finding user
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid Credential",
      });
    }
    //role checking
    if(user.role !== req.body.role){
      return res.status(404).send({
        success: false,
        message: "Role doesn't match",
      });
    }
    //Compare Password
    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!comparePassword) {
      return res.status(404).send({
        success: false,
        message: "Invalid Credential",
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while Login",
      error,
    });
  }
};

//Get current user
export const currentUserController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    return res.status(201).send({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting current user",
      error,
    });
  }
};
