const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderItems: [orderItemSchema],
    totalPrice: Number,
    paymentMethod: {
      type: String,
      required: true,
      default: "card",
    },
    isPaid: { type: Boolean, default: false },
    paidAt: Date,
    stripeSessionId: String,
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
