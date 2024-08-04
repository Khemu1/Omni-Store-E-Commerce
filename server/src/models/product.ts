import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is reqiured"],
    match: [
      /^(?=.{8,50}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "title is invalid, it should contain 8-50 alphanumeric letters and be unique!",
    ],
  },
  price: {
    type: [Number, "price must be a number"],
    required: [true, "price is required"],
  },
  category: {
    type: String,
    required: [true, "category is required"],
  },
  image: {
    type: String,
    required: [true, "image is required"],
  },
  rating: {
    type: Number,
    min: [1, "rating must be between 1 and 5"],
    max: [5, "rating must be between 1 and 5"],
    default: 5,
  },
  count: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    required: [true, "description is required"],
    match: [
      /^(?=.{8,150}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "description is invalid, it should contain 8-150 alphanumeric letters and be unique!",
    ],
  },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
