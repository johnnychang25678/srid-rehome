"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { mockItems, moreMockItems } from "@/lib/data";

export default function MarketPlace() {
  const [items, setItems] = useState(mockItems); // State for items
  const [loading, setLoading] = useState(false); // Loading state for infinite scroll
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [sortOption, setSortOption] = useState<"asc" | "desc">("asc"); // Sorting option

  // search for item name and description
  const filteredItems = items
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const priceA = parseFloat(a.price.replace("$", ""));
      const priceB = parseFloat(b.price.replace("$", ""));
      return sortOption === "asc" ? priceA - priceB : priceB - priceA;
    });

  // functions
  const fetchMoreItems = () => {
    setLoading(true);
    // setTimeout is used to fake api call delay
    setTimeout(() => {
      setItems((prevItems) => [...prevItems, ...moreMockItems]);
      setLoading(false);
    }, 1500);
  };

  const scrollToTop = (behavior: ScrollBehavior) => {
    window.scrollTo({ top: 0, behavior: behavior });
  };

  // useEffects
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        !loading
      ) {
        if (items.length < 5) {
          fetchMoreItems();
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, items.length]);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <>
        {/* Search Bar and Sorting */}
        <div className="flex items-center justify-between mb-6">
          <Input
            type="text"
            placeholder="Search"
            value={searchQuery} // Controlled input
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
            className="rounded-full"
          />
          <Select
            onValueChange={(value) => setSortOption(value as "asc" | "desc")}
            value={sortOption}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Price: Low to High</SelectItem>
              <SelectItem value="desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Item list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Link key={item.id} href={`/marketplace/${item.id}`}>
              <Card className="hover:shadow-md transition">
                <CardHeader>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={300}
                    height={160}
                    className="w-full h-40 object-cover rounded-md"
                    style={{ width: "100%", height: "auto" }} // Make image responsive
                  />
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-lg font-semibold">
                    {item.name}
                  </CardTitle>
                  <CardDescription className="text-gray-500">
                    {item.price}
                  </CardDescription>
                  <CardDescription className="text-gray-500">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="m-3"></div>
        {/* Loading Indicator */}
        {loading && (
          <div className="text-center mt-6">
            <p className="text-gray-500">Loading...</p>
          </div>
        )}
        {/* Back to Top Button */}
        <Button
          onClick={() => scrollToTop("smooth")}
          className="fixed bottom-4 right-4 bg-black text-white hover:bg-gray-700 rounded-full p-4 shadow-lg z-50"
        >
          ↑
        </Button>
      </>
    </div>
  );
}
