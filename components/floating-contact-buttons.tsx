"use client";

import type React from "react";

import { useState } from "react";
import { Mail, MessageSquare, Phone, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonConfig = {
  id: string;
  icon: React.ReactNode;
  color: string;
  glowColor: string;
  action: () => void;
  tooltip?: string;
};

type NotificationType = {
  message: string;
  buttonId: string;
};

export default function FloatingContactButtons() {
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );

  // Configure your buttons here
  const buttons: ButtonConfig[] = [
    {
      id: "email",
      icon: <Mail className="h-6 w-6" />,
      color: "bg-blue-500 hover:bg-blue-600",
      glowColor: "blue",
      tooltip: "Copy email address",
      action: () => {
        navigator.clipboard.writeText("contact@360home.vn");
        showNotification("Email copied to clipboard!", "email");
      },
    },
    {
      id: "chat",
      icon: <img src="/zalo.png" alt="Chat Icon" className="h-6 w-6" />,
      color: "bg-blue-500 hover:bg-blue-600",
      glowColor: "blue",
      tooltip: "Chat with us",
      action: () => {
        window.open("https://zalo.me/4438617373561395664", "_blank");
      },
    },
    {
      id: "phone",
      icon: <Phone className="h-6 w-6" />,
      color: "bg-red-500 hover:bg-red-600",
      glowColor: "red",
      tooltip: "Copy phone number",
      action: () => {
        navigator.clipboard.writeText("(+84) 88 6666 360");
        showNotification("Phone number copied to clipboard!", "phone");
      },
    },
  ];

  const showNotification = (message: string, buttonId: string) => {
    setNotification({ message, buttonId });

    // Auto-hide notification after 2 seconds
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  return (
    <div className="fixed right-4 bottom-4 flex flex-col space-y-3 z-50">
      {buttons.map((button) => (
        <div key={button.id} className="relative group">
          <button
            onClick={button.action}
            className={cn(
              button.color,
              "text-white p-3 rounded-full shadow-lg transition-colors",
              "animate-shake",
              "relative"
            )}
            aria-label={button.tooltip}
          >
            {/* Glow effect */}
            <span
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-300"
              style={{
                boxShadow: `0 0 15px 5px ${button.glowColor}`,
                animation: "pulse 2s infinite",
              }}
            />

            {button.icon}
          </button>

          {/* Tooltip */}
          {button.tooltip && (
            <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              {button.tooltip}
            </div>
          )}

          {/* Notification popup */}
          {notification && notification.buttonId === button.id && (
            <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-green-600 text-white text-sm rounded-md whitespace-nowrap flex items-center animate-fadeIn">
              <Check className="h-4 w-4 mr-1" />
              {notification.message}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
