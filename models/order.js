import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  // Clerk userId (string, e.g. "user_31mPykAnGFirdq4ttrdFfHYjxqL")
  userId: { type: String, required: true },  

  // Reference to Address document in MongoDB
  address: { type: mongoose.Schema.Types.ObjectId, ref: "Address", required: true },

  // Items in the order
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
    },
  ],

  // Total order amount
  amount: { type: Number, required: true },

  // Order status (default: pending)
  status: { type: String, enum: ["pending", "processing", "shipped", "delivered", "cancelled"], default: "pending" },

  // Created date
  date: { type: Date, default: Date.now },
});

// Prevent model overwrite in Next.js (hot reload issue)
const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
