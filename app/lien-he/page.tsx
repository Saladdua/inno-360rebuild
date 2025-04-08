import ContactForm from "@/components/contact-form";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-12">
          Liên hệ với chúng tôi
        </h1>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">
              Gửi tin nhắn cho chúng tôi
            </h2>
            <ContactForm />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Thông tin liên hệ</h2>

            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin
                  size={24}
                  className="text-[#8bc34a] mr-4 mt-1 flex-shrink-0"
                />
                <div>
                  <h3 className="font-bold text-lg">Địa chỉ</h3>
                  <p className="text-gray-600">
                    Số 39 đường Thượng Thụy, phường Phú Thượng, quận Tây Hồ, Hà
                    Nội
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone
                  size={24}
                  className="text-[#8bc34a] mr-4 mt-1 flex-shrink-0"
                />
                <div>
                  <h3 className="font-bold text-lg">Điện thoại</h3>
                  <p className="text-gray-600">
                    <a href="tel:0987654321" className="hover:text-[#8bc34a]">
                      (+84) 88 6666 360
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail
                  size={24}
                  className="text-[#8bc34a] mr-4 mt-1 flex-shrink-0"
                />
                <div>
                  <h3 className="font-bold text-lg">Email</h3>
                  <p className="text-gray-600">
                    <a
                      href="mailto:info@360home.vn"
                      className="hover:text-[#8bc34a]"
                    >
                      contact@360home.vn
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-bold text-lg mb-4">Bản đồ</h3>
              <div className="aspect-video bg-gray-200 rounded-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3722.6076008968307!2d105.79295127612987!3d21.088329085728272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab0047660761%3A0x87dafc4bc49f1152!2sC%C3%B4ng%20ty%20CP%20INNO%20-%20INNO%20JSC!5e0!3m2!1svi!2s!4v1744077837675!5m2!1svi!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
