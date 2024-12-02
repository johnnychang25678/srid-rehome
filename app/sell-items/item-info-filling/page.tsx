"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ItemInfo() {
  const router = useRouter();

  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div>
      <h1 className="text-2xl font-bold">Item Information</h1>
      <div className="mb-8">
        <Image
          src="/images/chair.jpeg"
          alt="Welcome Illustration"
          width={300}
          height={200}
          className="rounded-md"
        />
      </div>

      <div className="p-6 max-w-md mx-auto bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4">Item Information</h1>
        <form className="mt-6">
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="itemName"
            >
              Item Name
            </label>
            <input
              type="text"
              id="itemName"
              className="w-full px-3 py-2 border rounded-md"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="Enter item name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="price">
              Price
            </label>
            <input
              type="text"
              id="price"
              className="w-full px-3 py-2 border rounded-md"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="description"
            >
              Item Description
            </label>
            <textarea
              id="description"
              className="w-full px-3 py-2 border rounded-md"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter item description"
            ></textarea>
          </div>
        </form>
        <div className="flex gap-2 mt-6">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-300 text-black rounded-md"
          >
            Back
          </button>
          <Button
            onClick={() => {
              console.log({
                itemName,
                price,
                description,
              });
              router.push("/sell-items/item-info-filling/confirmation");
            }}
            className="bg-black text-white hover:bg-gray-700"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
