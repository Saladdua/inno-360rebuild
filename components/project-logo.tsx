import Image from "next/image";
import { memo } from "react";

interface ProjectLogoProps {
  title: string;
  logoUrl?: string | null;
}

function ProjectLogo({ title, logoUrl }: ProjectLogoProps) {
  // If we have a logo URL from the database, use it
  if (logoUrl) {
    return (
      <div className="w-16 h-16 relative">
        <Image
          src={logoUrl || "/placeholder.svg"}
          alt={`${title} logo`}
          fill
          className="object-contain"
          unoptimized={!logoUrl.startsWith("/placeholder")}
        />
      </div>
    );
  }

  // If no logo URL is provided, create a text-based logo
  const projectName = title.split(" ")[0]; // Get the first word

  // Map specific projects to their custom logos
  if (projectName === "LUMI") {
    return (
      <div className="w-16 h-16 flex flex-col justify-center">
        <div className="text-lg font-bold tracking-wide">LUMI</div>
        <div className="text-xs text-gray-600 uppercase">HANOI</div>
      </div>
    );
  }

  if (projectName === "DIAMOND") {
    return (
      <div className="w-16 h-16 flex items-center justify-center">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L2 12L12 22L22 12L12 2Z"
            stroke="#D4AF37"
            strokeWidth="2"
          />
          <path
            d="M12 6L6 12L12 18L18 12L12 6Z"
            stroke="#D4AF37"
            strokeWidth="2"
          />
        </svg>
      </div>
    );
  }

  if (projectName === "HERITAGE") {
    return (
      <div className="w-16 h-16 flex items-center justify-center">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="4"
            y="2"
            width="16"
            height="20"
            stroke="#B87333"
            strokeWidth="2"
          />
          <line x1="8" y1="6" x2="16" y2="6" stroke="#B87333" strokeWidth="2" />
          <line
            x1="8"
            y1="10"
            x2="16"
            y2="10"
            stroke="#B87333"
            strokeWidth="2"
          />
          <line
            x1="8"
            y1="14"
            x2="16"
            y2="14"
            stroke="#B87333"
            strokeWidth="2"
          />
          <line
            x1="8"
            y1="18"
            x2="16"
            y2="18"
            stroke="#B87333"
            strokeWidth="2"
          />
        </svg>
      </div>
    );
  }

  // Default logo for other projects
  const firstLetters = title
    .split(" ")
    .map((word) => word[0])
    .join("");
  return (
    <div className="w-16 h-16 flex items-center justify-center">
      <span className="text-lg font-bold">{firstLetters}</span>
    </div>
  );
}

// Memoize the component to prevent unnecessary re-renders
export default memo(ProjectLogo);
