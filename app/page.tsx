import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Check, ArrowRight } from "lucide-react";
import ProjectCarousel from "@/components/project-carousel";
import NewsCard from "@/components/news-card";
import { getProjects } from "@/lib/projects";
import PartnerLogos from "@/components/partner-logos";
import { getLatestNews } from "@/lib/news";
import FloatingContactButtons from "@/components/floating-contact-buttons";

export const revalidate = 0; // Disable caching for this page

export default async function Home() {
  const projects = await getProjects();
  const latestNews = await getLatestNews(4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px]">
        <link rel="icon" type="image/x-icon" href="/favicon.png" />
        <Image
          src="/hero-background.jpg"
          alt="Interior design"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            360HOME – Nền tảng kết nối
            <br />
            hoàn thiện nội thất toàn diện
          </h1>
          <p className="text-xl mb-8">
            Giải pháp hoàn hảo, tối ưu chi phí cho ngôi nhà của bạn!
          </p>
          <Link href="/lien-he" className="btn-primary text-lg">
            LIÊN HỆ TƯ VẤN NGAY
          </Link>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 bg-[#f5f5f5]">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Dự án tiêu biểu</h2>
          <ProjectCarousel projects={projects} />
        </div>
        <div className="text-center mt-8">
          <Link href="/du-an" className="btn-primary">
            XEM TẤT CẢ DỰ ÁN
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Về 360HOME</h2>
              <p className="text-gray-600 mb-4">
                360HOME là nền tảng kết nối hoàn thiện nội thất toàn diện, mang
                đến giải pháp hoàn hảo và tối ưu chi phí cho ngôi nhà của bạn.
              </p>
              <p className="text-gray-600 mb-6">
                Chúng tôi cung cấp dịch vụ thiết kế, thi công nội thất chuyên
                nghiệp với đội ngũ kiến trúc sư giàu kinh nghiệm, đảm bảo mang
                đến không gian sống hoàn hảo theo đúng nhu cầu và sở thích của
                khách hàng.
              </p>
              <Link href="/ly-do-lua-chon-360home" className="btn-primary">
                TÌM HIỂU THÊM
              </Link>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="/about-4.jpg"
                alt="About 360HOME"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-[#f5f5f5]">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Dịch vụ của chúng tôi</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-[#f5f5f5] rounded-full flex items-center justify-center mb-4 mx-auto">
                <Image
                  src="/service-1.png?height=40&width=40"
                  alt="Design"
                  width={40}
                  height={40}
                />
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">
                Thiết kế nội thất
              </h3>
              <p className="text-gray-600 text-center">
                Đội ngũ kiến trúc sư giàu kinh nghiệm sẽ tạo ra những thiết kế
                độc đáo, phù hợp với nhu cầu và phong cách của bạn.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-[#f5f5f5] rounded-full flex items-center justify-center mb-4 mx-auto">
                <Image
                  src="/service-2.png?height=40&width=40"
                  alt="Construction"
                  width={40}
                  height={40}
                />
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">
                Thi công nội thất
              </h3>
              <p className="text-gray-600 text-center">
                Chúng tôi đảm bảo quá trình thi công chuyên nghiệp, đúng tiến độ
                và chất lượng cao nhất.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-[#f5f5f5] rounded-full flex items-center justify-center mb-4 mx-auto">
                <Image
                  src="/service-3.png?height=40&width=40"
                  alt="Consultation"
                  width={40}
                  height={40}
                />
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">
                Tư vấn nội thất
              </h3>
              <p className="text-gray-600 text-center">
                Nhận tư vấn chuyên sâu về phong cách, vật liệu và giải pháp tối
                ưu cho không gian sống của bạn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Đối tác của chúng tôi
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Hợp tác với các thương hiệu uy tín trong và ngoài nước
            </p>
          </div>
          <PartnerLogos />
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-16 bg-[#f5f5f5]">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Tin tức mới nhất</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/tin-tuc" className="btn-primary">
              XEM TẤT CẢ TIN TỨC
            </Link>
          </div>
        </div>
      </section>

      {/* Floating Contact Buttons */}
      <FloatingContactButtons />

      {/* CTA Section */}
      <section className="py-16 bg-[#8bc34a] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Bạn cần tư vấn về nội thất?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Liên hệ với chúng tôi ngay hôm nay để nhận tư vấn miễn phí từ đội
            ngũ chuyên gia của 360HOME.
          </p>
          <Link href="/lien-he" className="btn-secondary text-lg">
            LIÊN HỆ NGAY
          </Link>
        </div>
      </section>
    </div>
  );
}
