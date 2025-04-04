import { NextResponse } from "next/server"
import { getProjectBySlug } from "@/lib/projects"

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug
    const project = await getProjectBySlug(slug)

    if (!project) {
      return NextResponse.json({ message: "Không tìm thấy dự án" }, { status: 404 })
    }

    return NextResponse.json({ project })
  } catch (error) {
    console.error("Error fetching project:", error)
    return NextResponse.json({ message: "Đã xảy ra lỗi khi lấy dự án" }, { status: 500 })
  }
}

