// export default function SellItems() {



//     return (
//         <div>
//             <h1 className="text-2xl font-bold">Sell Items</h1>
//             <p className="mt-2 text-gray-600">xxx</p>
//         </div>
//     );
// }
"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SellItems() {
    const [photo, setPhoto] = useState<File | null>(null);
    const router = useRouter();

    const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setPhoto(event.target.files[0]);
        }
    };

    const handleConfirm = () => {
        // Redirect to furniture information page with hardcoded data
        // router.push(`/furniture-info?name=Sofa&description=A%20comfortable%20sofa&price=100`);
        router.push('/sell-items/item-info-filling');

    };

    return (
        <div>
            <h1 className="text-2xl font-bold">Sell Items</h1>
            <input type="file" accept="image/*" onChange={handlePhotoUpload} />
            {photo && (
                <div>
                    <p className="mt-2 text-gray-600">Photo uploaded: {photo.name}</p>
                    <button onClick={handleConfirm} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                        Confirm Photo
                    </button>
                </div>
            )}
        </div>
    );
}
