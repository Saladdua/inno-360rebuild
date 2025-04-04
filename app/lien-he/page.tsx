import ContactForm from "@/components/contact-form"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-12">Liên hệ với chúng tôi</h1>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Gửi tin nhắn cho chúng tôi</h2>
            <ContactForm />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Thông tin liên hệ</h2>

            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin size={24} className="text-[#8bc34a] mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Địa chỉ</h3>
                  <p className="text-gray-600">Tầng 6, Tòa nhà Sunrise, 90 Trần Thái Tông, Cầu Giấy, Hà Nội</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone size={24} className="text-[#8bc34a] mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Điện thoại</h3>
                  <p className="text-gray-600">
                    <a href="tel:0987654321" className="hover:text-[#8bc34a]">
                      0987 654 321
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail size={24} className="text-[#8bc34a] mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Email</h3>
                  <p className="text-gray-600">
                    <a href="mailto:info@360home.vn" className="hover:text-[#8bc34a]">
                      info@360home.vn
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock size={24} className="text-[#8bc34a] mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Giờ làm việc</h3>
                  <p className="text-gray-600">
                    Thứ Hai - Thứ Sáu: 8:30 - 17:30
                    <br />
                    Thứ Bảy: 8:30 - 12:00
                    <br />
                    Chủ Nhật: Nghỉ
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-bold text-lg mb-4">Bản đồ</h3>
              <div className="aspect-video bg-gray-200 rounded-md">
                {/* Replace with actual Google Maps embed */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">Google Maps Embed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

