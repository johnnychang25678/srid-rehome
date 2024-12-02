"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ItemInfo() {
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    const imageUrl = sessionStorage.getItem("uploadedPhotos");
    console.log(imageUrl);
    if (imageUrl) {
      setImageSrc(imageUrl);
    }
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Item Information</h1>
      {/* {imageSrc && (
        <Image
          src={imageSrc}
          alt="Uploaded Item"
          className="mt-4"
          width={500}
          height={500}
        />
      )} */}
      {imageSrc && <img src={imageSrc} alt="Uploaded Item" className="mt-4" />}
      <button
        onClick={() => router.back()}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Go Back
      </button>
      <div className="p-6 max-w-md mx-auto bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4">Item Information</h1>
        {/* {imageSrc && (
          <Image
            src={imageSrc}
            alt="Uploaded Item"
            className="mt-4"
            width={500}
            height={500}
          />
        )} */}
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
          <button
            onClick={() => {
              console.log({
                itemName,
                price,
                description,
              });
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
