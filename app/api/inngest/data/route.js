import connectDB from "@/config/db";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // Clerk se fresh user info lao
    const clerkUser = await clerkClient.users.getUser(userId);

    // MongoDB me ensure user exist kare (upsert)
    const user = await User.findByIdAndUpdate(
      userId,
      {
        _id: userId,
        name: `${clerkUser.firstName} ${clerkUser.lastName}`,
        email: clerkUser.emailAddresses[0].emailAddress,
        imageUrl: clerkUser.imageUrl,
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}