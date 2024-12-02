"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
  //   const handlePreview = (index: number) => {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       const imageSrc = e.target?.result as string;
  //       sessionStorage.setItem("previewImage", imageSrc);
  //       router.push("/sell-items/preview");
  //     };
  //     reader.readAsDataURL(photos[index]);
  //   };
  const handleConfirm = () => {
    sessionStorage.setItem("uploadedPhotos", JSON.stringify(photos));
    router.push("/sell-items/item-info-filling");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Sell Items</h1>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handlePhotoUpload}
      />
      {photos.length > 0 && (
        <div>
          <p className="mt-2 text-gray-600">Photos uploaded:</p>
          <ul>
            {photos.map((photo, index) => (
              <li key={index}>
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
          <button
            onClick={handleConfirm}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Confirm Photos
          </button>
        </div>
      )}
    </div>
  );
}
