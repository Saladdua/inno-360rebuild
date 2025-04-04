import { NextResponse } from "next/server"
import { getProjects, getProjectsPaginated } from "@/lib/projects"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number(searchParams.get("page")) || 1
    const limit = Number(searchParams.get("limit")) || 10
    const all = searchParams.get("all") === "true"

    if (all) {
      const projects = await getProjects()
      return NextResponse.json({ projects })
    }

    const { projects, total } = await getProjectsPaginated(page, limit)
    return NextResponse.json({ projects, total, page, limit })
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ message: "Đã xảy ra lỗi khi lấy dự án" }, { status: 500 })
  }
}

