"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="360HOME"
            width={50}
            height={50}
            className="mr-2"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/ly-do-lua-chon-360home"
            className="nav-link uppercase text-sm"
          >
            Lý do lựa chọn 360HOME
          </Link>
          <Link
            href="https://360home.vn/xu-huong-thiet-ke-noi-that/"
            className="nav-link uppercase text-sm"
          >
            Xu hướng thiết kế nội thất
          </Link>
          <Link href="/du-an" className="nav-link uppercase text-sm">
            Dự án
          </Link>
          <Link
            href="https://360home.vn/tin-tuc"
            className="nav-link uppercase text-sm"
          >
            Tin tức
          </Link>
          <Link
            href="https://360home.vn/danh-cho-kts/"
            className="nav-link uppercase text-sm"
          >
            Dành cho KTS
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-3">
          <Link href="/lien-he" className="btn-primary text-sm">
            LIÊN HỆ TƯ VẤN
          </Link>

          {session ? (
            <div className="relative group">
              <button className="btn-secondary text-sm flex items-center py-2 px-4">
                {session.user?.name || "Tài khoản"}
              </button>
              {/* Increased hitbox by adding padding and making the dropdown div larger */}
              <div className="absolute right-0 mt-0 pt-2 w-48 group-hover:block hidden">
                <div className="bg-white rounded-md shadow-lg overflow-hidden z-20 border border-gray-200">
                  <Link
                    href="/profile"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Thông tin cá nhân
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link href="/auth/login" className="btn-secondary text-sm">
              ĐĂNG NHẬP
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <Link
              href="/ly-do-lua-chon-360home"
              className="nav-link py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Lý do lựa chọn 360HOME
            </Link>
            <Link
              href="/xu-huong-thiet-ke-noi-that"
              className="nav-link py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Xu hướng thiết kế nội thất
            </Link>
            <Link
              href="/du-an"
              className="nav-link py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dự án
            </Link>
            <Link
              href="/tin-tuc"
              className="nav-link py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tin tức
            </Link>
            <Link
              href="/danh-cho-kts"
              className="nav-link py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dành cho KTS
            </Link>
            <Link
              href="/lien-he"
              className="btn-primary text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              LIÊN HỆ TƯ VẤN
            </Link>

            {session ? (
              <>
                <Link
                  href="/profile"
                  className="nav-link py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Thông tin cá nhân
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="text-left nav-link py-2"
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="btn-secondary text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                ĐĂNG NHẬP
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
