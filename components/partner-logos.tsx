import Image from "next/image";

export default function PartnerLogos() {
  const partners = [
    { id: 1, name: "Partner 1", logo: "/partners/partner1.png" },
    { id: 2, name: "Partner 2", logo: "/partners/partner2.png" },
    { id: 3, name: "Partner 3", logo: "/partners/partner3.png" },
    { id: 4, name: "Partner 4", logo: "/partners/partner4.png" },
    { id: 5, name: "Partner 5", logo: "/partners/partner5.png" },
    { id: 6, name: "Partner 6", logo: "/partners/partner6.png" },
    { id: 7, name: "Partner 7", logo: "/partners/partner7.png" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-7">
      {partners.map((partner) => (
        <div
          key={partner.id}
          className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center"
        >
          <Image
            src={partner.logo || "/placeholder.svg"}
            alt={partner.name}
            width={120}
            height={60}
            className="h-12 w-auto object-contain grayscale"
          />
        </div>
      ))}
    </div>
  );
}
