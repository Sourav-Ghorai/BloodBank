import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    inventoryType: {
      type: String,
      required: [true, "inventory type is required"],
      enum: ["In", "Out"],
    },
    bloodGroup: {
      type: String,
      required: [true, "Blood group is required"],
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
    },
    email: {
      type: String,
      required: [true, "Donar's email is required"],
    },
    donarEmail: {
      type: String,
      required: [true, "Donar's email is required"],
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "Organization is required"],
    },
    donar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      // required: function () {
      //   return this.inventoryType === "In";
      // },
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: function () {
        return this.inventoryType === "Out";
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model('inventory', inventorySchema);