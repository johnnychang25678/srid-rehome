"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
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
import ItemDetail from "@/components/marketplace/ItemDetail";

export type Item = {
    id: number;
    name: string;
    price: string; // Use string if price includes symbols like "$"
    image: string; // Path to the item's image
    description: string;
};

const initialItems: Item[] = [
    { id: 1, name: "Table", price: "$40", image: "/images/table.jpeg", description: "a table" },
    { id: 2, name: "Chair", price: "$20", image: "/images/chair.jpeg", description: "a chair" },
    { id: 3, name: "Couch", price: "$120", image: "/images/sofa.jpeg", description: "a couch" },
];

export default function MarketPlace() {
    const [items, setItems] = useState(initialItems); // State for items
    const [loading, setLoading] = useState(false); // Loading state for infinite scroll
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [sortOption, setSortOption] = useState<"asc" | "desc">("asc"); // Sorting option

    // search for item name and description
    const filteredItems = items
        .filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            const priceA = parseFloat(a.price.replace("$", ""));
            const priceB = parseFloat(b.price.replace("$", ""));
            return sortOption === "asc" ? priceA - priceB : priceB - priceA;
        });

    const fetchMoreItems = () => {
        setLoading(true);
        // setTimeout is used to fake api call delay
        setTimeout(() => {
            setItems((prevItems) => [
                ...prevItems,
                {
                    id: prevItems.length + 1,
                    name: "TV Stand",
                    price: "$60",
                    image: "/images/tvstand.jpeg",
                    description: "a tv stand",
                },
                {
                    id: prevItems.length + 2,
                    name: "Bed",
                    price: "$90",
                    image: "/images/bed.jpeg",
                    description: "a bed",
                },
            ]);
            setLoading(false);
        }, 1500);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading) {
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
            {selectedItem ? (
                <ItemDetail
                    item={selectedItem}
                    onBack={() => setSelectedItem(null)} // Reset to show the items list
                />
            ) : (
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
                            onValueChange={(value) =>
                                setSortOption(value as "asc" | "desc")
                            }
                            value={sortOption}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sort by Price" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="asc">
                                    Price: Low to High
                                </SelectItem>
                                <SelectItem value="desc">
                                    Price: High to Low
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {/* Item list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredItems.map((item) => (
                            <Card
                                key={item.id}
                                onClick={() => setSelectedItem(item)}
                                className="hover:shadow-md transition"
                            >
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
                        ))}
                    </div>
                    {/* Loading Indicator */}
                    {loading && (
                        <div className="text-center mt-6">
                            <p className="text-gray-500">Loading...</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
