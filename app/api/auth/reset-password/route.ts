import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { executeQuery } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { message: "Token and password are required" },
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

    const resetToken = tokens[0];

    // Hash the new password
    const hashedPassword = await hash(password, 10);

    // Update the user's password
    await executeQuery({
      query: "UPDATE users SET password = ? WHERE id = ?",
      values: [hashedPassword, resetToken.user_id],
    });

    // Delete the used token
    await executeQuery({
      query: "DELETE FROM password_reset_tokens WHERE id = ?",
      values: [resetToken.id],
    });

    return NextResponse.json(
      { message: "Password reset successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
