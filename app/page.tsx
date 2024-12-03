"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { getCurrentUser } from "@/lib/utils";

export default function HomePage() {

  const [usernameLink, setUsernameLink] = useState("");

  useEffect(() => {
    const profile = getCurrentUser();
    setUsernameLink(`/profile/${profile?.username as string}`);
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen mt-2">
      {/* Welcome Message */}
      <h1 className="text-3xl font-bold mb-6 text-center">Welcome to ReHome!</h1>

      {/* Illustration */}
      <div className="mb-8">
        <Image
          src="/images/home_illustration.png"
          alt="Welcome Illustration"
          width={300}
          height={200}
          className="rounded-md"
        />
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
        <Link href="/marketplace" passHref>
          <Button variant="default" className="bg-black text-white hover:bg-gray-700 w-full">
            I want to Buy
          </Button>
        </Link>
        <Link href="/sell-items" passHref>
          <Button variant="default" className="bg-black text-white hover:bg-gray-700 w-full">
            I want to Sell
          </Button>
        </Link>
        <Link href="/furnishing-service" passHref>
          <Button variant="default" className="bg-black text-white hover:bg-gray-700 w-full">
            Request for Furnishing Service
          </Button>
        </Link>
        <Link href={usernameLink} passHref>
          <Button variant="default" className="hover:bg-gray-100 w-full">
            View Profile
          </Button>
        </Link>
        <Link href="/my-orders" passHref>
          <Button variant="default" className="hover:bg-gray-100 w-full">
            View My Orders
          </Button>
        </Link>
        <Link href="/my-listings" passHref>
          <Button variant="default" className="hover:bg-gray-100 w-full">
            View My Listings
          </Button>
        </Link>
      </div>
    </div>
  );
}
