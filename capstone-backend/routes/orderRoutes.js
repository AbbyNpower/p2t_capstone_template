const express = require("express");
const router = express.Router();

const { getOrders, createOrderFromStripe } = require("../controllers/orderController");
const { protect, admin } = require("../middleware/authMiddleware");

// admin view all orders
router.get("/", protect, admin, getOrders);

// called from success page (no auth)
router.post("/from-stripe", createOrderFromStripe);

module.exports = router;
