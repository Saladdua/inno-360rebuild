"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-bold text-red-500">500</h1>
        <h2 className="mt-6 text-3xl font-bold">Đã xảy ra lỗi</h2>
        <p className="mt-2 text-gray-600">
          Đã có lỗi xảy ra. Vui lòng thử lại sau hoặc liên hệ với chúng tôi nếu vấn đề vẫn tiếp diễn.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <button onClick={() => reset()} className="btn-primary">
            Thử lại
          </button>
          <Link href="/" className="btn-secondary">
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    </div>
  )
}

