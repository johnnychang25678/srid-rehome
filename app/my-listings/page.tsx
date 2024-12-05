"use client";

import { getListings } from "@/lib/utils";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Listing } from "@/lib/types";

export default function MyListings() {
  const [listing, setListing] = useState<Listing[]>([]);

  useEffect(() => {
    const savedListing = getListings();
    setListing(savedListing);
  }, []);

  function formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp);
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }
  return (
    <div className="bg-white">
      <div className="max-w-2xl px-4">
        <div className="flex justify-start items-center gap-x-2">
          <h1 className="text-left text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            My Listings
          </h1>
        </div>

        <form>
          <section>
            {listing.map((listing) => {
              //   const item = getItemById(listing.id);
              const item = listing;
              console.log(item);
              if (!item) return null;
              return (
                <Card className="mt-4">
                  <CardHeader>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={300}
                      height={160}
                      className="w-full h-40 object-cover rounded-md"
                    />
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="mb-2">{item.name}</CardTitle>
                    <CardDescription className="flex flex-col justify-between">
                      <span>Price: ${item.price}</span>

                      <span>
                        Post Date: {formatTimestamp(listing.timestamp)}
                      </span>
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </section>
        </form>
      </div>
    </div>
  );
  //   );
}
