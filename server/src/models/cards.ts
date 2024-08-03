import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, required: true },
  name: { type: String, required: true },
  expiry: { type: String, required: true },
  cvc: { type: String, required: true },
  number: { type: String, required: true, unique: true },
  default: { type: Boolean, required: true, default: false },
});

const Card = mongoose.models.Card || mongoose.model("Card", CardSchema);

export default Card;
