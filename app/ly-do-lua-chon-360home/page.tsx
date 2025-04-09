"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Mail, Phone, MessageSquare } from "lucide-react";
import Footer from "@/components/footer";
import FloatingContactButtons from "@/components/floating-contact-buttons";
import StakeholderBoxes from "@/components/stakeholder-boxes";

export default function AboutPage() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const stakeholders = [
    {
      id: 1,
      title: "NHÀ THẦU THI CÔNG",
      icon: "/why-choose-1.png",
      benefits: [
        "Được kết nối với chủ nhà để cung cấp dịch vụ thi công",
        "Tiết kiệm chi phí do thi công theo dự án trong điểm",
      ],
    },
    {
      id: 2,
      title: "TƯ VẤN THIẾT KẾ",
      icon: "/why-choose-2.png",
      benefits: [
        "Tiếp cận kho thư viện thiết kế miễn phí",
        "Thiết kế nhanh hơn",
        "Được cung cấp sách mẫu nội thất dành riêng cho kiến trúc sư",
        "Được kết nối với chủ nhà để cung cấp dịch vụ thiết kế",
        "Được tham gia vào cộng đồng Kiến trúc sư của 360HOME",
      ],
    },
    {
      id: 3,
      title: "CHỦ NHÀ",
      icon: "/why-choose-3.png",
      benefits: [
        "Thỏa sức xem thiết kế căn hộ tương lai của mình",
        "Tặng thiết kế miễn phí",
        "Mua nội thất với giá bán buôn cùng với vận quả tặng, combo hấp dẫn từ đơn vị cung ứng",
        "Đăng ký thi công cải tạo đơn giản, nhanh chóng",
        "Hỗ trợ làm việc với đơn vị thi công, đơn vị cung ứng",
      ],
    },
    {
      id: 4,
      title: "CHỦ ĐẦU TƯ DỰ ÁN",
      icon: "/why-choose-4.png",
      benefits: [
        "Làm phong phú bộ tài liệu bán hàng",
        "Đồng hành cùng CĐT trong việc quảng bá sản phẩm tới khách hàng",
        "Tạo cảm xúc, tăng trải nghiệm khách hàng, thúc đẩy bán hàng tốt hơn",
      ],
    },
    {
      id: 5,
      title: "ĐƠN VỊ CUNG ỨNG",
      icon: "/why-choose-5.png",
      benefits: [
        "Thúc đẩy bán hàng tốt hơn",
        "Được tham gia vào chợ thương mại điện tử 360Market",
        "Tối ưu chi phí vận chuyển giao hàng",
      ],
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-[#8bc34a]">
              Trang chủ
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-800">Tại sao lựa chọn 360HOME</span>
          </div>
        </div>
      </div>

      {/* Stakeholders Section */}
      <StakeholderBoxes
        backgroundImage="/about-background.png"
        title="360HOME"
        subtitle="Nền tảng kết nối thông minh giữa các bên đối tác"
      />

      {/* About Company Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Về chúng tôi</h2>
            <div className="w-20 h-1 bg-[#8bc34a] mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-[#8bc34a] mb-4">
                VỀ 360HOME
              </h3>
              <p className="text-gray-700 mb-6">
                360HOME là nền tảng kết nối thông minh giữa các bên đối tác gồm:
                Chủ đầu tư dự án, tư vấn thiết kế, chủ nhà, đơn vị cung ứng, nhà
                thầu thi công.
              </p>
              <p className="text-gray-700 mb-6">
                Các bên cùng tham gia vào chuỗi giá trị liên quan tới ngành
                thiết kế cung ứng vật tư, xây dựng bằng tiêu chuẩn tổ chức thông
                tin BIM. Qua đó tạo ra mạng lưới thông tin đồng bộ, tạo thuận
                lợi thúc đẩy các giao dịch với số lượng lớn đem lại lợi ích cho
                chủ nhà và tất cả các bên tham gia hệ thống.
              </p>
            </div>
            <div className="relative h-[500px] overflow-hidden shadow-xl">
              <Image
                src="/about-1.jpg"
                alt="About 360HOME"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="h-12"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] overflow-hidden shadow-xl">
              <Image
                src="/about-2.jpg"
                alt="About 360HOME"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-[#8bc34a] mb-4">
                VỚI CHỦ NHÀ
              </h3>
              <p className="text-gray-700 mb-6">
                Thỏa sức xem thiết kế căn hộ tương lai của mình: Mỗi căn hộ được
                thiết kế theo các ý tưởng thiết kế tốt nhất trên thị trường theo
                nhiều phong cách và nhiều không gian khác nhau.
              </p>
              <p className="text-gray-700 mb-6">
                Tặng thiết kế miễn phí: Khách hàng chỉ cần vào thư viện 360HOME
                chọn căn hộ của mình và ấn tải thiết kế miễn phí vô cùng đơn
                giản.
              </p>
              <p className="text-gray-700 mb-6">
                Mua nội thất với giá bán buôn cùng vô vàn quà tặng, combo hấp
                dẫn từ đơn vị cung ứng. Chúng tôi kết hợp gom đơn mua chung, đặt
                hàng số lượng lớn để tiết kiệm chi phí vận chuyển và nhập hàng
                với giá ưu đãi từ các hãng. Bên cạnh đó, 360HOME còn là đại lý
                độc quyền, đại lý cấp 1 của nhiều nhãn hàng nổi tiếng. Đây là
                những lý do tại sao 360HOME bán đồ nội thất với chính sách giá
                ưu đãi đi đôi với chất lượng sản phẩm.
              </p>
              <p className="text-gray-700 mb-6">
                Hỗ trợ thủ tục đăng ký thi công cải tạo đơn giản, nhanh chóng
              </p>
              <p className="text-gray-700 mb-6">
                Hỗ trợ kết nối với đơn vị thi công, đơn vị cung ứng theo yêu
                cầu, giúp chủ nhà kiểm soát chi phí và chất lượng công trình.
              </p>
            </div>
          </div>

          <div className="h-12"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-[#8bc34a] mb-4">
                VỚI CHỦ ĐẦU TƯ DỰ ÁN
              </h3>
              <p className="text-gray-700 mb-6">
                Thúc đẩy bán hàng tốt hơn: trên nền tảng của 360HOME, khách hàng
                có thể hình dung rõ hơn không gian ngôi nhà tương lai của mình
                với nhiều phong cách nội thất khác nhau. Qua đó giúp tăng cảm
                xúc khách hàng và tác động tích cực tới quyết định mua nhà.
              </p>
            </div>
            <div className="relative h-[500px] overflow-hidden shadow-xl">
              <Image
                src="/about-3.jpg"
                alt="About 360HOME"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="h-12"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] overflow-hidden shadow-xl">
              <Image
                src="/about-4.jpg"
                alt="About 360HOME"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-[#8bc34a] mb-4">
                VỚI TƯ VẤN THIẾT KẾ
              </h3>
              <p className="text-gray-700 mb-6">
                Tiếp cận kho thư viên thiết kế miễn phí: Kho thư viện đa dạng
                trong phong cách thiết kế, phù hợp nhiều không gian sống, các
                Kiến trúc sư có thể tham khảo, hiểu rõ hơn về cấu trúc của căn
                nhà cần thiết kế cho khách.
              </p>
              <p className="text-gray-700 mb-6">
                Thiết kế nhanh hơn: Toàn bộ sản phẩm trong thiết kế của 360HOME
                hoàn toàn có thực, có báo giá kèm theo, rút ngắn thời gian tìm
                kiếm đồ, giúp kiến trúc sư thiết kế nhanh hơn.
              </p>
              <p className="text-gray-700 mb-6">
                Hưởng chính sách mua nội thất dành riêng cho kiến trúc sư: Các
                kiến trúc sư khi mua nội thất qua 360HOME sẽ được hưởng chính
                cách ưu đãi đặc biệt dành riêng cho kiến trúc sư.
              </p>
              <p className="text-gray-700 mb-6">
                Được kết nối với chủ nhà để cung cấp dịch vụ thiết kế: trở thành
                cộng tác viên của 360HOME trong việc thiết kế và bán đồ nôi thất
                cho các khách hàng của 360HOME.
              </p>
              <p className="text-gray-700 mb-6">
                Tham gia vào cộng đồng kiến trúc sư của 360HOME: là cộng đồng
                giao lưu, kết nối và chia sẻ kinh nghiệm của các kiến trúc sư.
              </p>
            </div>
          </div>

          <div className="h-12"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-[#8bc34a] mb-4">
                VỚI ĐƠN VỊ CUNG ỨNG
              </h3>
              <p className="text-gray-700 mb-6">
                Thúc đẩy bán hàng tốt hơn: Các đơn vị cung ứng sẽ trở thành đối
                tác của 360HOME, được tham gia vào chợ thương mại điện tử của
                360HOME mang tên 360Market. Bên cạnh đó, 360HOME sẽ đưa các sản
                phẩm của các đơn vị cung ứng vào trong thiết kế gửi tới khách
                hàng.
              </p>
            </div>
            <div className="relative h-[500px] overflow-hidden shadow-xl">
              <Image
                src="/about-5.jpg"
                alt="About 360HOME"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="h-12"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] overflow-hidden shadow-xl">
              <Image
                src="/about-6.jpg"
                alt="About 360HOME"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-[#8bc34a] mb-4">
                VỚI NHÀ THẦU THI CÔNG
              </h3>
              <p className="text-gray-700 mb-6">
                Được kết nối với chủ nhà để cung cấp dịch vụ thi công
              </p>
              <p className="text-gray-700 mb-6">
                Tiết kiệm chi phí thi công: 360HOME thường tập trung triển khai
                theo từng dự án trọng điểm, do đó các nhà thầu đối tác của
                360HOME có thể quản lý thi công tập trung tại 1 dự án, nhiều căn
                hộ trong 1 khoảng thời gian nhất định.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Flow Section */}
      <section className="relative py-16">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/process-flow-background.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white inline-block px-6 py-2 rounded-lg">
              QUY TRÌNH CỦA CHÚNG TÔI
            </h2>
            <div className="w-20 h-1 bg-[#8bc34a] mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                number: "01",
                title: "CHỌN DỰ ÁN",
                description: "• Chọn dự án bạn quan tâm",
                color: "bg-[#c64773]",
              },
              {
                number: "02",
                title: "CHỌN CĂN HỘ",
                description: "• Chọn căn hộ bạn muốn xem thiết kế",
                color: "bg-[#e85642]",
              },
              {
                number: "03",
                title: "XEM THIẾT KẾ",
                description: "• Xem và tìm hiểu các phương án thiết kế",
                color: "bg-[#f8c944]",
              },
              {
                number: "04",
                title: "CHỌN PHƯƠNG ÁN",
                description: "• Lựa chọn các phương án thiết kế bạn thích",
                color: "bg-[#1a6e7d]",
              },
              {
                number: "05",
                title: "TÁI THIẾT KẾ",
                description:
                  "• Tái thiết kế miễn phí\n• Liên hệ cập báo giá theo thiết kế\n• Chỉnh sửa thiết kế (nếu bạn muốn)",
                color: "bg-[#2a9d8f]",
              },
              {
                number: "06",
                title: "KÝ HỢP ĐỒNG",
                description:
                  "• Chốt phương án thiết kế và ký hợp đồng hoàn thiện nội thất",
                color: "bg-[#66c2bc]",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="border-2 border-white shadow-lg overflow-hidden rounded-lg"
              >
                <div className={`${step.color} text-white p-8`}>
                  <div className="flex flex-col items-center justify-center text-center">
                    <span className="text-6xl font-bold mb-2">
                      {step.number}
                    </span>
                    <h3 className="text-xl font-bold tracking-wide">
                      {step.title}
                    </h3>
                  </div>
                </div>
                <div className="p-4 bg-white min-h-[100px]">
                  <div className="text-sm text-gray-700 whitespace-pre-line">
                    {step.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#8bc34a] text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Bạn muốn trở thành đối tác của 360HOME?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Hãy tham gia cùng chúng tôi để cùng nhau phát triển và mang lại giá
            trị cho khách hàng
          </p>
          <Link
            href="/lien-he"
            className="bg-white text-[#8bc34a] px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-100 transition-colors inline-block"
          >
            Liên hệ ngay
          </Link>
        </div>
      </section>

      {/* Floating Contact Buttons */}
      <FloatingContactButtons />
    </main>
  );
}
