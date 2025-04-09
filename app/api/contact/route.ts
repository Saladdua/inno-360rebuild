import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";
import { sendEmail } from "@/lib/email";

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

    const contactEmail =
      process.env.CONTACT_EMAIL || "minhnghia14603@gmail.com";

    // Send email using our helper function
    const emailResult = await sendEmail({
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
    });

    if (!emailResult.success) {
      console.error("Failed to send email:", emailResult.error);
      // Still return success to the user, but log the error
      return NextResponse.json(
        {
          message:
            "Tin nhắn đã được lưu thành công, nhưng có lỗi khi gửi email.",
          emailSent: false,
        },
        { status: 200 }
      );
    }

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
