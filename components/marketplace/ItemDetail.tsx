import React from "react";
import { Item } from "@/app/marketplace/page";
import Image from "next/image";

export default function ItemDetail({
    item,
    onBack,
}: {
    item: Item;
    onBack: () => void;
}) {
    return (
        <div className="p-4 flex-col justify-center">
            <button
                onClick={onBack}
                className="mb-4 text-black hover:underline">
                ← Back to Browsing
            </button>
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
