import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { hash, compare } from "bcrypt";
import { authOptions } from "@/lib/auth";
import { executeQuery } from "@/lib/db";

export async function POST(request: Request) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { currentPassword, newPassword } = await request.json();

    // Validate input
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { message: "Mật khẩu hiện tại và mật khẩu mới là bắt buộc" },
        { status: 400 }
      );
    }

    // Get user from database
    const users = (await executeQuery({
      query: "SELECT * FROM users WHERE id = ?",
      values: [session.user.id],
    })) as any[];

    if (users.length === 0) {
      return NextResponse.json(
        { message: "Người dùng không tồn tại" },
        { status: 404 }
      );
    }

    const user = users[0];

    // Verify current password
    const isPasswordValid = await compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Mật khẩu hiện tại không chính xác" },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await hash(newPassword, 10);

    // Update password in database
    await executeQuery({
      query: "UPDATE users SET password = ?, updated_at = NOW() WHERE id = ?",
      values: [hashedPassword, session.user.id],
    });

    return NextResponse.json(
      { message: "Đổi mật khẩu thành công" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Change password error:", error);
    return NextResponse.json(
      { message: "Đã xảy ra lỗi khi đổi mật khẩu" },
      { status: 500 }
    );
  }
}
