import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-bold text-[#8bc34a]">404</h1>
        <h2 className="mt-6 text-3xl font-bold">Không tìm thấy trang</h2>
        <p className="mt-2 text-gray-600">Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.</p>
        <div className="mt-6">
          <Link href="/" className="btn-primary">
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    </div>
  )
}

