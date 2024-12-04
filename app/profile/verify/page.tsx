"use client";

import { useState, useEffect } from "react";
import { getCurrentUser, getUsers } from "@/lib/utils";
import { useRouter } from "next/navigation";

type Profile = {
    username: string;
    email: string;
    avatar: string;
    verified: boolean;
};


export default function VerifyEmailPage() {
    const [profile, setProfile] = useState<Profile | null>(null); // Allow null for initial state
    const [verificationCode, setVerificationCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    useEffect(() => {
        const currentUser = getCurrentUser();
        if (!currentUser) {
            // Redirect to home or login page if not logged in
            router.push("/");
            return;
        }

        if (!currentUser.email.endsWith(".edu")) {
            setErrorMessage("Only .edu email addresses are allowed.");
            return;
        }

        if (currentUser.verified) {
            // Redirect to profile page if already verified
            router.push(`/profile/${currentUser.username}`);
            return;
        }

        setProfile(currentUser);
    }, [router]);

    if (!profile) {
        return <div>Loading...</div>;
    }

    const handleVerify = () => {
        // Mock verification code for demonstration
        const correctCode = "123456";

        if (verificationCode !== correctCode) {
            setErrorMessage("Invalid verification code. Please try again.");
            return;
        }

        // Simulate email verification by updating the 'verified' status
        const storedUsers = getUsers();
        const updatedUsers = storedUsers.map((user) =>
            user.username === profile.username
                ? { ...user, verified: true }
                : user
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        // Update current user in localStorage
        localStorage.setItem(
            "user",
            JSON.stringify({ ...profile, verified: true })
        );

        // Redirect to the profile page
        router.back();
    };

    const handleExit = () => {
        router.back()
    };

    if (errorMessage) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="bg-white shadow-md p-6 rounded-md text-center max-w-md">
                    <h1 className="mb-4 text-2xl font-bold">Error</h1>
                    <p className="mb-6 text-red-500">{errorMessage}</p>
                    <button
                        onClick={handleExit}
                        className="bg-gray-300 text-black hover:bg-gray-400 w-full py-2 rounded-md"
                    >
                        Exit
                    </button>
                </div>
            </div>
        );
    }


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white shadow-md p-6 rounded-md text-center max-w-md">
                <h1 className="mb-4 text-2xl font-bold">Verify Your Email. Hint: 123456</h1>
                <p className="mb-4">
                    Enter the verification code sent to your .edu email address.
                </p>
                <input
                    type="text"
                    placeholder="Enter verification code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="w-full mb-4 px-4 py-2 border rounded-md"
                />
                {errorMessage && (
                    <p className="mb-4 text-red-500 text-sm">{errorMessage}</p>
                )}
                <button
                    onClick={handleVerify}
                    className="bg-black text-white hover:bg-gray-700 w-full py-2 rounded-md mb-4"
                >
                    Verify Email
                </button>
                <button
                    onClick={handleExit}
                    className="bg-gray-300 text-black hover:bg-gray-400 w-full py-2 rounded-md"
                >
                    Exit
                </button>
            </div>
        </div>
    );
}
