import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function getImageSrc(
  url: string | null | undefined,
  defaultSize = "600x800"
) {
  if (!url)
    return `/placeholder.svg?height=${defaultSize.split("x")[0]}&width=${
      defaultSize.split("x")[1]
    }`;

  // If it's already a placeholder, return as is
  if (url.startsWith("/placeholder.svg")) return url;

  // Return the actual URL
  return url;
}

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
