import { inngest } from "@/config/inngest"; 
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import User from "@/models/User";
import Order from "@/models/order"; // ✅ import order model

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const { address, items } = await request.json();

    if (!address || items.length === 0) {
      return NextResponse.json({ success: false, message: "Invalid data" });
    }

    // calculate amount properly
    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) continue;
      amount += product.offerPrice * item.quantity;
    }
    amount = amount + Math.floor(amount * 0.02);

    // ✅ save order in MongoDB
    const order = await Order.create({
      userId,
      address,
      items,
      amount,
    });

    // trigger event
    await inngest.send({
      name: "order/created",
      data: {
        orderId: order._id,
        userId,
        address,
        items,
        amount,
        date: Date.now(),
      },
    });

    // clear cart
    const user = await User.findById(userId);
    if (user) {
      user.cartItems = {};
      await user.save();
    }

    return NextResponse.json({ success: true, message: "Order placed", order });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message });
  }
}
