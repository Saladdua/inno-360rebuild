import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { getProjectsPaginated } from "@/lib/projects"

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const currentPage = Number(searchParams.page) || 1
  const limit = 9

  const { projects, total } = await getProjectsPaginated(currentPage, limit)
  const totalPages = Math.ceil(total / limit)

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-12">Dự án</h1>

        <Suspense fallback={<div>Đang tải...</div>}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="project-card overflow-hidden">
                <Link href={`/du-an/${project.slug}`}>
                  <div className="relative h-64 w-full">
                    <Image
                      src={project.imageUrl || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <Link href={`/du-an/${project.slug}`}>
                    <h2 className="font-bold text-xl mb-2 hover:text-[#8bc34a] transition-colors">{project.title}</h2>
                  </Link>
                  <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Diện tích: {project.area} m²</span>
                    <span>{project.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <nav className="flex items-center space-x-2">
                {currentPage > 1 && (
                  <Link
                    href={`/du-an?page=${currentPage - 1}`}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                  >
                    Trước
                  </Link>
                )}

                {Array.from({ length: totalPages }).map((_, index) => (
                  <Link
                    key={index}
                    href={`/du-an?page=${index + 1}`}
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
                    href={`/du-an?page=${currentPage + 1}`}
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

