import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { executeQuery } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json()

    // Validate input
    if (!name || !email || !phone || !message) {
      return NextResponse.json({ message: "Thiếu thông tin bắt buộc" }, { status: 400 })
    }

    // Save contact to database
    await executeQuery({
      query: "INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)",
      values: [name, email, phone, message],
    })

    // Send email notification
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.CONTACT_EMAIL || "info@360home.vn",
      subject: "Liên hệ mới từ website 360HOME",
      html: `
        <h1>Thông tin liên hệ mới</h1>
        <p><strong>Tên:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Số điện thoại:</strong> ${phone}</p>
        <p><strong>Tin nhắn:</strong></p>
        <p>${message}</p>
      `,
    })

    return NextResponse.json({ message: "Tin nhắn đã được gửi thành công" }, { status: 200 })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ message: "Đã xảy ra lỗi khi gửi tin nhắn" }, { status: 500 })
  }
}

