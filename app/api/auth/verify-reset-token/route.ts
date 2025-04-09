import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { message: "Token is required" },
        { status: 400 }
      );
    }

    // Check if token exists and is not expired
    const tokens = (await executeQuery({
      query: `
        SELECT * FROM password_reset_tokens 
        WHERE token = ? AND expires > NOW()
      `,
      values: [token],
    })) as any[];

    if (tokens.length === 0) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    return NextResponse.json({ valid: true }, { status: 200 });
  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
