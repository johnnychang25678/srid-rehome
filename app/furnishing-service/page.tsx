import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FurnishingService() {
    return (
        <div className="flex flex-col items-center min-h-screen">
            {/* Page Title */}
            <h1 className="text-2xl font-bold mb-6">Request for Furnishing</h1>

            {/* Illustration */}
            <div className="mb-8">
                <Image
                    src="/images/furnishing-illustration.png" // Replace with your actual image path
                    alt="Furnishing Service Illustration"
                    width={300}
                    height={200}
                    className="rounded-md"
                />
            </div>

            {/* Buttons */}
            <div className="space-y-4 w-full max-w-sm flex-col">
                <Link href="/furnishing-service/request-service" passHref>
                    <Button
                        variant="default"
                        className="bg-black text-white hover:bg-gray-700 w-full"
                    >
                        Request for Service
                    </Button>
                </Link>
                <div></div>
                <Link href="/furnishing-service/view-requests" passHref>
                    <Button
                        variant="default"
                        className="bg-black text-white hover:bg-gray-700 w-full"
                    >
                        View My Requests
                    </Button>
                </Link>
            </div>
        </div>
    );
}
