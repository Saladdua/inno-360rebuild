import Image from "next/image";

export default function PartnerLogos() {
  const partners = [
    {
      id: 1,
      name: "Partner 1",
      logo: "https://360home.vn/wp-content/uploads/2022/12/Rectangle-87-1.png",
    },
    {
      id: 2,
      name: "Partner 2",
      logo: "https://360home.vn/wp-content/uploads/2022/12/Rectangle-90.png",
    },
    {
      id: 3,
      name: "Partner 3",
      logo: "https://360home.vn/wp-content/uploads/2022/12/Rectangle-88.png",
    },
    {
      id: 4,
      name: "Partner 4",
      logo: "https://360home.vn/wp-content/uploads/2022/12/Rectangle-89.png",
    },
    {
      id: 5,
      name: "Partner 5",
      logo: "https://360home.vn/wp-content/uploads/2022/12/Rectangle-91.png",
    },
    {
      id: 6,
      name: "Partner 6",
      logo: "https://360home.vn/wp-content/uploads/2024/03/logo-flexfit1.png",
    },
    {
      id: 7,
      name: "Partner 7",
      logo: "https://360home.vn/wp-content/uploads/2024/03/attachment-1.png",
    },
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
