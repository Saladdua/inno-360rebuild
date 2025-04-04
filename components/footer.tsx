import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#f5f5f5] pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center mb-4">
              <Image src="/logo.png" alt="360HOME" width={50} height={50} className="mr-2" />
              <span className="font-bold text-xl">360HOME</span>
            </Link>
            <p className="text-gray-600 mb-4">
              Nền tảng kết nối hoàn thiện nội thất toàn diện. Giải pháp hoàn hảo, tối ưu chi phí cho ngôi nhà của bạn!
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#8bc34a]"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#8bc34a]"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#8bc34a]"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/ly-do-lua-chon-360home" className="text-gray-600 hover:text-[#8bc34a]">
                  Lý do lựa chọn 360HOME
                </Link>
              </li>
              <li>
                <Link href="/xu-huong-thiet-ke-noi-that" className="text-gray-600 hover:text-[#8bc34a]">
                  Xu hướng thiết kế nội thất
                </Link>
              </li>
              <li>
                <Link href="/du-an" className="text-gray-600 hover:text-[#8bc34a]">
                  Dự án
                </Link>
              </li>
              <li>
                <Link href="/tin-tuc" className="text-gray-600 hover:text-[#8bc34a]">
                  Tin tức
                </Link>
              </li>
              <li>
                <Link href="/danh-cho-kts" className="text-gray-600 hover:text-[#8bc34a]">
                  Dành cho KTS
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Dịch vụ</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/thiet-ke-noi-that" className="text-gray-600 hover:text-[#8bc34a]">
                  Thiết kế nội thất
                </Link>
              </li>
              <li>
                <Link href="/thi-cong-noi-that" className="text-gray-600 hover:text-[#8bc34a]">
                  Thi công nội thất
                </Link>
              </li>
              <li>
                <Link href="/tu-van-noi-that" className="text-gray-600 hover:text-[#8bc34a]">
                  Tư vấn nội thất
                </Link>
              </li>
              <li>
                <Link href="/bao-gia" className="text-gray-600 hover:text-[#8bc34a]">
                  Báo giá
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 text-[#8bc34a] mt-1 flex-shrink-0" />
                <span className="text-gray-600">Tầng 6, Tòa nhà Sunrise, 90 Trần Thái Tông, Cầu Giấy, Hà Nội</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-[#8bc34a] flex-shrink-0" />
                <a href="tel:0987654321" className="text-gray-600 hover:text-[#8bc34a]">
                  0987 654 321
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-[#8bc34a] flex-shrink-0" />
                <a href="mailto:info@360home.vn" className="text-gray-600 hover:text-[#8bc34a]">
                  info@360home.vn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} 360HOME. Tất cả các quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}

