import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { createNews, getLatestNews, getNewsPaginated } from "@/lib/news"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number(searchParams.get("page")) || 1
    const limit = Number(searchParams.get("limit")) || 10
    const latest = searchParams.get("latest") === "true"

    if (latest) {
      const latestLimit = Number(searchParams.get("count")) || 4
      const news = await getLatestNews(latestLimit)
      return NextResponse.json({ news })
    }

    const { news, total } = await getNewsPaginated(page, limit)
    return NextResponse.json({ news, total, page, limit })
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json({ message: "Đã xảy ra lỗi khi lấy tin tức" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: "Bạn cần đăng nhập để thực hiện hành động này" }, { status: 401 })
    }

    const data = await request.json()

    // Validate required fields
    if (!data.title || !data.content || !data.imageUrl) {
      return NextResponse.json({ message: "Thiếu thông tin bắt buộc" }, { status: 400 })
    }

    // Generate slug from title if not provided
    if (!data.slug) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")
    }

    // Generate excerpt if not provided
    if (!data.excerpt) {
      data.excerpt = data.content.substring(0, 150) + "..."
    }

    // Set author from session if not provided
    if (!data.author) {
      data.author = session.user?.name || "Anonymous"
    }

    const newsId = await createNews(data)

    return NextResponse.json({ message: "Tin tức đã được tạo thành công", id: newsId }, { status: 201 })
  } catch (error) {
    console.error("Error creating news:", error)
    return NextResponse.json({ message: "Đã xảy ra lỗi khi tạo tin tức" }, { status: 500 })
  }
}

