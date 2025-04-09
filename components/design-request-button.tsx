"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

interface DesignRequestButtonProps {
  projectSlug: string;
}

export default function DesignRequestButton({
  projectSlug,
}: DesignRequestButtonProps) {
  const { data: session, status } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleRequestDesign = async () => {
    if (!session) return;

    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/design-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectSlug }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Đã xảy ra lỗi khi gửi yêu cầu");
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đã xảy ra lỗi");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show login button if not authenticated
  if (status === "unauthenticated") {
    return (
      <Link
        href="/auth/login?callbackUrl=/du-an/${projectSlug}"
        className="btn-primary"
      >
        ĐĂNG NHẬP ĐỂ NHẬN THIẾT KẾ
      </Link>
    );
  }

  // Show loading while checking authentication
  if (status === "loading") {
    return (
      <button disabled className="btn-primary opacity-70">
        <Loader2 size={20} className="mr-2 animate-spin" />
        ĐANG TẢI...
      </button>
    );
  }

  // Show success message
  if (success) {
    return (
      <div className="text-center">
        <button
          disabled
          className="btn-primary bg-green-600 hover:bg-green-600"
        >
          ĐÃ GỬI YÊU CẦU THÀNH CÔNG
        </button>
        <p className="mt-2 text-sm text-green-600">
          Chúng tôi đã gửi email xác nhận đến địa chỉ {session?.user?.email}
        </p>
      </div>
    );
  }

  // Show error message
  if (error) {
    return (
      <div className="text-center">
        <button
          onClick={handleRequestDesign}
          className="btn-primary bg-red-600 hover:bg-red-700"
        >
          THỬ LẠI
        </button>
        <p className="mt-2 text-sm text-red-600">{error}</p>
      </div>
    );
  }

  // Show request button for authenticated users
  return (
    <button
      onClick={handleRequestDesign}
      disabled={isSubmitting}
      className="btn-primary flex items-center justify-center"
    >
      {isSubmitting ? (
        <>
          <Loader2 size={20} className="mr-2 animate-spin" />
          ĐANG GỬI YÊU CẦU...
        </>
      ) : (
        "NHẬN THIẾT KẾ TƯƠNG TỰ"
      )}
    </button>
  );
}
