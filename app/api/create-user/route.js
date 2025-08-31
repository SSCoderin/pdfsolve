import { NextResponse } from "next/server";
import { connect } from "../../../database/connect";
import User from "../../../model/UserModel";

export async function POST(request) {
  try {
    const { id, username, email } = await request.json();
    await connect();

    if (!id || !username || !email) {
      return NextResponse.json(
        { error: "User data is required" },
        { status: 400 }
      );
    }

    const existuser = await User.findOne({ id: id });
    if (existuser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 200 }
      );
    }

    const newUser = new User({ id: id, username: username, email: email });
    await newUser.save();
    return NextResponse.json({ success: true, user: newUser });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
