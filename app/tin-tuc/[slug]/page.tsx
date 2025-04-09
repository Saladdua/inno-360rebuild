import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNewsBySlug, getLatestNews } from "@/lib/news";
import { formatDate } from "@/lib/utils";
import NewsCard from "@/components/news-card";
import FloatingContactButtons from "@/components/floating-contact-buttons";

export default async function NewsDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const news = await getNewsBySlug(params.slug);

  if (!news) {
    notFound();
  }

  const relatedNews = await getLatestNews(4);

  // Function to determine if a URL is external or a placeholder
  const getImageSrc = (url: string | null | undefined) => {
    if (!url) return "/placeholder.svg?height=600&width=800";

    // If it's already a placeholder, return as is
    if (url.startsWith("/placeholder.svg")) return url;

    // Return the actual URL
    return url;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <div className="relative h-[400px] w-full">
            <Image
              src={getImageSrc(news.imageUrl) || "/placeholder.svg"}
              alt={news.title}
              fill
              className="object-cover"
              priority
              unoptimized={
                !!news.imageUrl && !news.imageUrl.startsWith("/placeholder.svg")
              }
            />
          </div>

          <div className="p-6 md:p-8">
            <div className="mb-4 text-gray-500">
              <span>{formatDate(news.created_at)}</span>
              <span className="mx-2">•</span>
              <span>Tác giả: {news.author}</span>
            </div>

            <h1 className="text-3xl font-bold mb-6">{news.title}</h1>

            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: news.content }} />
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Tin tức liên quan</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedNews
              .filter((item) => item.id !== news.id)
              .slice(0, 4)
              .map((item) => (
                <NewsCard key={item.id} news={item} />
              ))}
          </div>
        </div>

        <div className="text-center">
          <Link href="/tin-tuc" className="btn-primary">
            XEM TẤT CẢ TIN TỨC
          </Link>
        </div>
      </div>
      {/* Floating Contact Buttons */}
      <FloatingContactButtons />
    </div>
  );
}
