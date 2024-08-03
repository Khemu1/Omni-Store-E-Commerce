import mongoose from "mongoose";

const OrdersSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  AddressId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: true,
  },
  cardId: { type: mongoose.Schema.Types.ObjectId, ref: "Card", required: true },
  orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.models.Order || mongoose.model("Order", OrdersSchema);

export default Order;
