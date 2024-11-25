import React from "react";
import { Item } from "@/app/marketplace/page";
import Image from "next/image";
import { Button } from "../ui/button";

export default function ItemDetail({
    item,
    onBack,
}: {
    item: Item;
    onBack: () => void;
}) {
    return (
        <div className="flex flex-col items-center min-h-screen">
            <div className="w-[400px] mb-4">
                <Button
                    onClick={onBack}
                    className="hover:underline"
                >
                    ← Back to Browsing
                </Button>
            </div>
            <div className="w-[400px] border rounded-lg p-4 shadow-md">
                <div className="flex justify-center">
                    <Image
                        src={item.image}
                        alt={item.name}
                        width={300}
                        height={200}
                        className="rounded-md mb-4"
                    />
                </div>
                <h1 className="text-2xl font-bold mb-2">{item.name}</h1>
                <p className="text-lg font-semibold text-gray-700 mb-4">
                    {item.price}
                </p>
                <p className="text-gray-600">{item.description}</p>
            </div>
        </div>
    );
}
