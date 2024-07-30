import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: {
    type: String,
    required: [true, "Full name (First and Last name) is Required"],
  },
  street: {
    type: String,
    required: [true, "Street is Required"],
  },
  city: {
    type: String,
    required: [true, "City is Required"],
  },
  country: {
    type: String,
    required: [true, "Country is Required"],
  },
  zipCode: {
    type: String,
    required: [true, "Zip Code is Required"],
    match: [/^[0-9]{5}$/, "Zip Code should be a 5-digit number"],
  },
  default: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const Address =
  mongoose.models.Address || mongoose.model("Address", addressSchema);

export default Address;
