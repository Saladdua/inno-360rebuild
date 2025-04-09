import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { executeQuery } from "@/lib/db";

export async function POST(request: Request) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { name, phone, address } = await request.json();

    // Validate input
    if (!name) {
      return NextResponse.json({ message: "Tên là bắt buộc" }, { status: 400 });
    }

    // Update user in database
    await executeQuery({
      query: `
        UPDATE users 
        SET name = ?, 
            phone = ?, 
            address = ?,
            updated_at = NOW()
        WHERE id = ?
      `,
      values: [name, phone || null, address || null, session.user.id],
    });

    return NextResponse.json(
      { message: "Cập nhật thông tin thành công" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json(
      { message: "Đã xảy ra lỗi khi cập nhật thông tin" },
      { status: 500 }
    );
  }
}
