"use client";

import "./globals.css"; // Import Tailwind or global styles
import Layout from "@/components/Layout";
import { useEffect } from "react";
import { mockUsers } from "@/lib/data";

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify(mockUsers));
      }
      if (!localStorage.getItem("user")) {
        localStorage.setItem(
            "user",
            JSON.stringify(mockUsers[mockUsers.length - 1])
        );
      }
    }
  }, []);

  return (
      <html lang="en">
      <body>
      <Layout>{children}</Layout>
      </body>
      </html>
  );
}
