import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

export const registerController = async(req, res) =>{
   try {
      //Finding user if exist
      const existingUser = await userModel.findOne({email: req.body.email})
      if(existingUser){
         return res.status(200).send({
            success: false,
            message: "User already exist",
         })
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
         user
      })
   } catch (error) {
      console.log(error);
      res.status(500).send({
         success: false,
         message: "Internal Server error in registering user",
         error
      })
   }
}