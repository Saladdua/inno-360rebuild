import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import nodemailer from "nodemailer";
import { authOptions } from "@/lib/auth";
import { executeQuery } from "@/lib/db";
import { getProjectBySlug } from "@/lib/projects";

export async function POST(request: Request) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { projectSlug } = await request.json();
    if (!projectSlug) {
      return NextResponse.json(
        { message: "Project slug is required" },
        { status: 400 }
      );
    }

    // Get project details
    const project = await getProjectBySlug(projectSlug);
    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    // Save design request to database
    await executeQuery({
      query:
        "INSERT INTO design_requests (user_id, project_id, status) VALUES (?, ?, ?)",
      values: [session.user.id, project.id, "pending"],
    });

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: Number(process.env.EMAIL_SERVER_PORT) === 465,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
      debug: true,
      logger: true,
    });

    // Send email to user
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: session.user.email || "",
      subject: `Yêu cầu thiết kế tương tự dự án ${project.title}`,
      html: `
        <h1>Xác nhận yêu cầu thiết kế</h1>
        <p>Xin chào ${session.user.name},</p>
        <p>Cảm ơn bạn đã gửi yêu cầu thiết kế tương tự dự án <strong>${project.title}</strong>.</p>
        <p>Chúng tôi đã nhận được yêu cầu của bạn và sẽ liên hệ lại trong thời gian sớm nhất.</p>
        <h2>Thông tin dự án:</h2>
        <ul>
          <li><strong>Tên dự án:</strong> ${project.title}</li>
          <li><strong>Vị trí:</strong> ${project.location}</li>
          <li><strong>Diện tích:</strong> ${project.area} m²</li>
        </ul>
        <p>Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua email hoặc số điện thoại.</p>
        <p>Trân trọng,<br>Đội ngũ 360HOME</p>
      `,
    });

    // Also send notification to admin
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.CONTACT_EMAIL || "info@360home.vn",
      subject: `Yêu cầu thiết kế mới từ ${session.user.name}`,
      html: `
        <h1>Yêu cầu thiết kế mới</h1>
        <p><strong>Khách hàng:</strong> ${session.user.name}</p>
        <p><strong>Email:</strong> ${session.user.email}</p>
        <p><strong>Dự án tham khảo:</strong> ${project.title}</p>
        <p><strong>Thời gian yêu cầu:</strong> ${new Date().toLocaleString(
          "vi-VN"
        )}</p>
      `,
    });

    return NextResponse.json(
      { message: "Yêu cầu thiết kế đã được gửi thành công" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Design request error:", error);
    return NextResponse.json(
      {
        message: "Đã xảy ra lỗi khi gửi yêu cầu thiết kế",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
