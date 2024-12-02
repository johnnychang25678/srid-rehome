"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function FinalizeListing() {
  const router = useRouter();

  const handleSubmit = () => {
    router.push("/my-listings"); // Navigate to success page
  };

  return (
    <div className="p-6 mx-auto bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Finalize Listing</h1>
      <p className="text-sm text-gray-500 mb-6">
        Review and confirm your listing details.
      </p>

      <div className="mb-6">
        <label className="block text-lg font-medium mb-1">Item Name</label>
        <p className="text-gray-700">Chair</p>
      </div>
      <div className="mb-6">
        <label className="block text-lg font-medium mb-1">Price</label>
        <p className="text-gray-700">$10</p>
      </div>
      <div className="mb-6">
        <label className="block text-lg font-medium mb-1">
          Item Description
        </label>
        <p className="text-gray-700">This is a sturdy chair.</p>
      </div>

      <div className="mb-6">
        <label className="block text-lg font-medium mb-1">Photo</label>
        <Image
          src="/images/chair.jpeg"
          alt="Welcome Illustration"
          width={300}
          height={200}
          className="rounded-md"
        />
      </div>

      <div className="flex gap-2 mt-6">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-300 text-black rounded-md"
        >
          Back
        </button>
        <Button
          onClick={handleSubmit}
          className="bg-black text-white hover:bg-gray-700"
        >
          Confirm and Publish
        </Button>
      </div>
    </div>
  );
}
