import connectDB from "@/config/db";
import User from "@/models/User";
import { getAuth} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { cartData } = await request.json();
    await connectDB();

    const user = await User.findByIdAndUpdate(
      userId,
      { cartItems: cartData },
      { new: true }
    );

    return NextResponse.json({ success: true, cartItems: user.cartItems });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}