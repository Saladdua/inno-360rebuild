import { NextResponse } from "next/server"
import { hash } from "bcrypt"
import { executeQuery } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ message: "Thiếu thông tin bắt buộc" }, { status: 400 })
    }

    // Check if user already exists
    const existingUsers = (await executeQuery({
      query: "SELECT * FROM users WHERE email = ?",
      values: [email],
    })) as any[]

    if (existingUsers.length > 0) {
      return NextResponse.json({ message: "Email đã được sử dụng" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Create user
    await executeQuery({
      query: "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      values: [name, email, hashedPassword],
    })

    return NextResponse.json({ message: "Đăng ký thành công" }, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Đã xảy ra lỗi khi đăng ký" }, { status: 500 })
  }
}

