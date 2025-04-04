import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import { randomBytes } from "crypto"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    // Validate input
    if (!email) {
      return NextResponse.json({ message: "Email là bắt buộc" }, { status: 400 })
    }

    // Check if user exists
    const users = (await executeQuery({
      query: "SELECT * FROM users WHERE email = ?",
      values: [email],
    })) as any[]

    if (users.length === 0) {
      // Don't reveal that the user doesn't exist
      return NextResponse.json(
        { message: "Nếu email tồn tại, chúng tôi đã gửi hướng dẫn đặt lại mật khẩu" },
        { status: 200 },
      )
    }

    // Generate reset token
    const token = randomBytes(32).toString("hex")
    const expires = new Date()
    expires.setHours(expires.getHours() + 1) // Token expires in 1 hour

    // Save token to database
    await executeQuery({
      query: "INSERT INTO password_reset_tokens (user_id, token, expires) VALUES (?, ?, ?)",
      values: [users[0].id, token, expires],
    })

    // Send email with reset link
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    })

    const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Đặt lại mật khẩu 360HOME",
      html: `
        <p>Bạn đã yêu cầu đặt lại mật khẩu.</p>
        <p>Vui lòng nhấp vào liên kết sau để đặt lại mật khẩu:</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>
        <p>Liên kết này sẽ hết hạn sau 1 giờ.</p>
      `,
    })

    return NextResponse.json(
      { message: "Nếu email tồn tại, chúng tôi đã gửi hướng dẫn đặt lại mật khẩu" },
      { status: 200 },
    )
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json({ message: "Đã xảy ra lỗi khi xử lý yêu cầu" }, { status: 500 })
  }
}

