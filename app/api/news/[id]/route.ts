import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { getNewsBySlug, updateNews, deleteNews } from "@/lib/news"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Check if id is a slug
    if (isNaN(Number(id))) {
      const news = await getNewsBySlug(id)

      if (!news) {
        return NextResponse.json({ message: "Không tìm thấy tin tức" }, { status: 404 })
      }

      return NextResponse.json({ news })
    }

    // Handle numeric ID case if needed
    // ...

    return NextResponse.json({ message: "Không tìm thấy tin tức" }, { status: 404 })
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json({ message: "Đã xảy ra lỗi khi lấy tin tức" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: "Bạn cần đăng nhập để thực hiện hành động này" }, { status: 401 })
    }

    const id = Number(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ message: "ID không hợp lệ" }, { status: 400 })
    }

    const data = await request.json()
    const success = await updateNews(id, data)

    if (!success) {
      return NextResponse.json({ message: "Không tìm thấy tin tức hoặc không có thay đổi" }, { status: 404 })
    }

    return NextResponse.json({ message: "Tin tức đã được cập nhật thành công" }, { status: 200 })
  } catch (error) {
    console.error("Error updating news:", error)
    return NextResponse.json({ message: "Đã xảy ra lỗi khi cập nhật tin tức" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: "Bạn cần đăng nhập để thực hiện hành động này" }, { status: 401 })
    }

    const id = Number(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ message: "ID không hợp lệ" }, { status: 400 })
    }

    const success = await deleteNews(id)

    if (!success) {
      return NextResponse.json({ message: "Không tìm thấy tin tức" }, { status: 404 })
    }

    return NextResponse.json({ message: "Tin tức đã được xóa thành công" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting news:", error)
    return NextResponse.json({ message: "Đã xảy ra lỗi khi xóa tin tức" }, { status: 500 })
  }
}

