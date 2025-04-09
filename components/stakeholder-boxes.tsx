"use client";

import type { ReactNode } from "react";
import Image from "next/image";

type StakeholderBoxProps = {
  icon: ReactNode;
  title: string;
  benefits: string[];
  color?: string;
};

const StakeholderBox = ({
  icon,
  title,
  benefits,
  color = "text-[#8bc34a]",
}: StakeholderBoxProps) => {
  return (
    <div className="min-w-[250px] w-full bg-white/90 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden h-full transition-transform hover:translate-y-[-5px]">
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 flex items-center justify-center text-green-600">
            {icon}
          </div>
        </div>
        <h3 className={`text-center ${color} font-bold text-lg mb-4`}>
          {title}
        </h3>
        <ul className="space-y-2 text-sm text-gray-700 flex-grow">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

type StakeholderBoxesProps = {
  backgroundImage: string;
  title?: string;
  subtitle?: string;
};

export default function StakeholderBoxes({
  backgroundImage,
  title,
  subtitle,
}: StakeholderBoxesProps) {
  const stakeholders = [
    {
      title: "CHỦ ĐẦU TƯ DỰ ÁN",
      icon: (
        <img src="/why-choose-2.png" alt="Custom Icon" className="w-15 h-15" />
      ),
      benefits: [
        "Làm phong phú bộ tài liệu bán hàng",
        "Đồng hành cùng CĐT trong việc quảng bá sản phẩm tới khách hàng",
        "Tạo cảm xúc, tăng trải nghiệm khách hàng, thúc đẩy bán hàng tốt hơn",
      ],
    },
    {
      title: "ĐƠN VỊ CUNG ỨNG",
      icon: (
        <img src="/why-choose-3.png" alt="Custom Icon" className="w-15 h-15" />
      ),
      benefits: [
        "Thúc đẩy bán hàng tốt hơn",
        "Được tham gia vào chợ thương mại điện tử 360Market",
        "Tối ưu chi phí vận chuyển giao hàng",
      ],
    },
    {
      title: "NHÀ THẦU THI CÔNG",
      icon: (
        <img src="/why-choose-4.png" alt="Custom Icon" className="w-15 h-15" />
      ),
      benefits: [
        "Được kết nối với chủ nhà để cung cấp dịch vụ thi công",
        "Tiết kiệm chi phí do thi công theo dự án trong điểm",
      ],
    },
    {
      title: "TƯ VẤN THIẾT KẾ",
      icon: (
        <img src="/why-choose-5.png" alt="Custom Icon" className="w-15 h-15" />
      ),
      benefits: [
        "Tiếp cận kho thư viện thiết kế miễn phí",
        "Thiết kế nhanh hơn",
        "Được cung cấp sách mẫu nội thất dành riêng cho kiến trúc sư",
        "Được kết nối với chủ nhà để cung cấp dịch vụ thiết kế",
        "Được tham gia vào cộng đồng Kiến trúc sư của 360HOME",
      ],
    },
    {
      title: "CHỦ NHÀ",
      icon: (
        <img src="/why-choose-1.png" alt="Custom Icon" className="w-15 h-15" />
      ),
      benefits: [
        "Thỏa sức xem thiết kế căn hộ tương lai của mình",
        "Tặng thiết kế miễn phí",
        "Mua nội thất với giá bán buôn cùng với vận quả tặng, combo hấp dẫn từ đơn vị cung ứng",
        "Đăng ký thi công cải tạo đơn giản, nhanh chóng",
        "Hỗ trợ làm việc với đơn vị thi công, đơn vị cung ứng",
      ],
    },
  ];

  return (
    <section className="relative py-16">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage || "/placeholder.svg"}
          alt="Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-4xl font-bold text-white mb-4">{title}</h2>
            )}
            {subtitle && (
              <p className="text-xl text-white max-w-3xl mx-auto">{subtitle}</p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {stakeholders.map((stakeholder, index) => (
            <StakeholderBox
              key={index}
              icon={stakeholder.icon}
              title={stakeholder.title}
              benefits={stakeholder.benefits}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
