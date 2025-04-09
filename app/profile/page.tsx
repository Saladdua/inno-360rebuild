"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import UpdateProfileForm from "@/components/update-profile-form";
import ChangePasswordForm from "@/components/change-password-form";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);

  useEffect(() => {
    // If the user is not authenticated, redirect to login
    if (status === "unauthenticated") {
      router.push("/auth/login?callbackUrl=/profile");
    } else if (status === "authenticated") {
      setIsLoading(false);
    }
  }, [status, router]);

  // For debugging
  console.log("Profile page - Session status:", status);
  console.log("Profile page - Session data:", session);

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 size={40} className="mx-auto animate-spin text-[#8bc34a]" />
          <p className="mt-4 text-gray-600">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            Bạn cần đăng nhập để xem trang này
          </h1>
          <Link href="/auth/login?callbackUrl=/profile" className="btn-primary">
            Đăng nhập
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 md:p-8">
            <h1 className="text-3xl font-bold mb-6">Thông tin cá nhân</h1>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-lg font-semibold mb-2">
                    Thông tin tài khoản
                  </h2>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="mb-4">
                      <p className="text-sm text-gray-500">Họ và tên</p>
                      <p className="font-medium">
                        {session?.user?.name || "Chưa cập nhật"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">
                        {session?.user?.email || "Chưa cập nhật"}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-2">Tùy chọn</h2>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <button
                      className="btn-primary w-full mb-3"
                      onClick={() => setShowUpdateForm(true)}
                    >
                      Cập nhật thông tin
                    </button>
                    <button
                      className="btn-secondary w-full"
                      onClick={() => setShowChangePasswordForm(true)}
                    >
                      Đổi mật khẩu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Update Profile Form Modal */}
      {showUpdateForm && (
        <UpdateProfileForm onClose={() => setShowUpdateForm(false)} />
      )}

      {/* Change Password Form Modal */}
      {showChangePasswordForm && (
        <ChangePasswordForm onClose={() => setShowChangePasswordForm(false)} />
      )}
    </div>
  );
}
