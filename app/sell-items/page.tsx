"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function SellItems() {
  const [photos, setPhotos] = useState<File[]>([]);
  const router = useRouter();

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setPhotos((prevPhotos) => [
        ...prevPhotos,
        ...Array.from(event.target.files || []),
      ]);
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  const handleConfirm = () => {
    sessionStorage.setItem("uploadedPhotos", JSON.stringify(photos));
    router.push("/sell-items/item-info-filling");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Sell Items</h1>

      <div className="mb-8 flex justify-center">
        <Image
          src="/images/image.png"
          alt="Welcome Illustration"
          width={300}
          height={200}
          className="rounded-md"
        />
      </div>
      <p className="mt-2 text-gray-600 text-center">
        Upload photos of your item. We will help you create a listing with AI.
      </p>
      <div className="flex justify-center">
        <label className="bg-black text-white hover:bg-gray-700 mt-4 px-4 py-2 rounded-md cursor-pointer">
          Upload Photos
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoUpload}
            className="hidden"
          />
        </label>
      </div>
      {photos.length > 0 && (
        <div>
          <p className="mt-2 text-gray-600 text-center">Photos uploaded:</p>
          <ul className="flex flex-col items-center">
            {photos.map((photo, index) => (
              <li key={index} className="flex items-center mb-2">
                {photo.name}
                <button
                  onClick={() => handleRemovePhoto(index)}
                  className="ml-2 text-red-500"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-center mt-4">
            <Button
              onClick={handleConfirm}
              className="bg-black text-white hover:bg-gray-700"
            >
              Confirm Photos
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
