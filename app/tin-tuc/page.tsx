import { Suspense } from "react"
import Link from "next/link"
import NewsCard from "@/components/news-card"
import { getNewsPaginated } from "@/lib/news"

export default async function NewsPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const currentPage = Number(searchParams.page) || 1
  const limit = 8

  const { news, total } = await getNewsPaginated(currentPage, limit)
  const totalPages = Math.ceil(total / limit)

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-12">Tin tức</h1>

        <Suspense fallback={<div>Đang tải...</div>}>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {news.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <nav className="flex items-center space-x-2">
                {currentPage > 1 && (
                  <Link
                    href={`/tin-tuc?page=${currentPage - 1}`}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                  >
                    Trước
                  </Link>
                )}

                {Array.from({ length: totalPages }).map((_, index) => (
                  <Link
                    key={index}
                    href={`/tin-tuc?page=${index + 1}`}
                    className={`px-4 py-2 border rounded-md ${
                      currentPage === index + 1
                        ? "bg-[#8bc34a] text-white border-[#8bc34a]"
                        : "border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {index + 1}
                  </Link>
                ))}

                {currentPage < totalPages && (
                  <Link
                    href={`/tin-tuc?page=${currentPage + 1}`}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                  >
                    Sau
                  </Link>
                )}
              </nav>
            </div>
          )}
        </Suspense>
      </div>
    </div>
  )
}

