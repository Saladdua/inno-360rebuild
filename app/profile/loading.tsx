import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader2 size={40} className="mx-auto animate-spin text-[#8bc34a]" />
        <p className="mt-4 text-gray-600">Đang tải thông tin...</p>
      </div>
    </div>
  );
}
