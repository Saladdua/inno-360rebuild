import Image from "next/image"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import type { News } from "@/types/news"

interface NewsCardProps {
  news: News
}

export default function NewsCard({ news }: NewsCardProps) {
  return (
    <div className="news-card">
      <Link href={`/tin-tuc/${news.slug}`}>
        <div className="relative h-48 w-full">
          <Image src={news.imageUrl || "/placeholder.svg"} alt={news.title} fill className="object-cover" />
        </div>
      </Link>
      <div className="p-4">
        <p className="text-sm text-gray-500 mb-2">{formatDate(news.createdAt)}</p>
        <Link href={`/tin-tuc/${news.slug}`}>
          <h3 className="font-bold text-lg mb-2 hover:text-[#8bc34a] transition-colors line-clamp-2">{news.title}</h3>
        </Link>
        <p className="text-gray-600 line-clamp-3">{news.excerpt}</p>
      </div>
    </div>
  )
}

