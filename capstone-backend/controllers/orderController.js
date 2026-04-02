const Order = require("../models/Order");
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ADMIN: get all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create order from Stripe session
exports.createOrderFromStripe = async (req, res) => {
  try {
    const { sessionId } = req.query;

    const existing = await Order.findOne({ stripeSessionId: sessionId });
    if (existing) return res.status(409).json({ message: "Order already exists" });

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const items = await stripe.checkout.sessions.listLineItems(sessionId);

    const order = new Order({
      orderItems: items.data.map((i) => ({
        name: i.description,
        price: i.price.unit_amount / 100,
        quantity: i.quantity,
      })),
      totalPrice: session.amount_total / 100,
      isPaid: session.payment_status === "paid",
      paidAt: new Date(session.created * 1000),
      stripeSessionId: sessionId,
      paymentMethod: session.payment_method_types[0] || "card",
    });

    const saved = await order.save();
    res.json(saved);
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ error: err.message });
  }
};
