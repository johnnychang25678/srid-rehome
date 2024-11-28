"use client"
import { useRouter } from 'next/navigation';

export default function ItemInfo() {
    const router = useRouter();

    return (
        <div>
            <h1 className="text-2xl font-bold">Item Information</h1>
            <p className="mt-2 text-gray-600">This is the item information page.</p>
            <button onClick={() => router.back()} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                Go Back
            </button>
        </div>
    );
}
