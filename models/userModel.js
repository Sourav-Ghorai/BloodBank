import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: [true, "Role is required"],
      enum: ["donar", "hospital", "admin", "organization"],
    },
    name: {
      type: String,
      required: function () {
        if (this.role === "donar" || this.role === "admin") return true;
        else return false;
      },
    },
    organizationName: {
      type: String,
      required: function () {
        if (this.role === "organization") return true;
        else return false;
      },
    },
    hospitalName: {
      type: String,
      required: function () {
        if (this.role === "hospital") return true;
        else return false;
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    website: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);
