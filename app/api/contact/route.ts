import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { executeQuery } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json();

    // Validate input
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { message: "Thiếu thông tin bắt buộc" },
        { status: 400 }
      );
    }

    // Save contact to database
    await executeQuery({
      query:
        "INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)",
      values: [name, email, phone, message],
    });

    // Create email transporter with detailed logging
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: Number(process.env.EMAIL_SERVER_PORT) === 465, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
      debug: true, // Enable debug output
      logger: true, // Log information about the email sending process
    });

    // Verify connection configuration
    try {
      await transporter.verify();
      console.log("Email server connection verified successfully");
    } catch (verifyError) {
      console.error(
        "Email server connection verification failed:",
        verifyError
      );
      // Still continue to try sending the email
    }

    const contactEmail = process.env.CONTACT_EMAIL || "info@360home.vn";

    // Send email with detailed content
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: contactEmail,
      subject: "Liên hệ mới từ website 360HOME",
      html: `
        <h1>Thông tin liên hệ mới</h1>
        <p><strong>Tên:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Số điện thoại:</strong> ${phone}</p>
        <p><strong>Tin nhắn:</strong></p>
        <p>${message}</p>
      `,
    };

    console.log(
      "Attempting to send email with options:",
      JSON.stringify({
        from: mailOptions.from,
        to: mailOptions.to,
        subject: mailOptions.subject,
      })
    );

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);

    return NextResponse.json(
      {
        message: "Tin nhắn đã được gửi thành công",
        emailSent: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        message: "Đã xảy ra lỗi khi gửi tin nhắn",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
