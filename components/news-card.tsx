import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { News } from "@/types/news";

interface NewsCardProps {
  news: News;
}

export default function NewsCard({ news }: NewsCardProps) {
  // Function to determine if a URL is external or a placeholder
  const getImageSrc = (url: string | null | undefined) => {
    if (!url) return "/placeholder.svg?height=400&width=600";

    // If it's already a placeholder, return as is
    if (url.startsWith("/placeholder.svg")) return url;

    // Return the actual URL
    return url;
  };

  return (
    <div className="news-card">
      <Link href={`/tin-tuc/${news.slug}`}>
        <div className="relative h-48 w-full">
          <Image
            src={getImageSrc(news.imageUrl) || "/placeholder.svg"}
            alt={news.title}
            fill
            className="object-cover"
            unoptimized={
              !!news.imageUrl && !news.imageUrl.startsWith("/placeholder.svg")
            }
          />
        </div>
      </Link>
      <div className="p-4">
        <p className="text-sm text-gray-500 mb-2">
          {formatDate(news.created_at)}
        </p>
        <Link href={`${news.slug}`}>
          <h3 className="font-bold text-lg mb-2 hover:text-[#8bc34a] transition-colors line-clamp-2">
            {news.title}
          </h3>
        </Link>
        <p className="text-gray-600 line-clamp-3">{news.excerpt}</p>
      </div>
    </div>
  );
}
