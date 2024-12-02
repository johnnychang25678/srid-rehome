// pages/profile/verify.js

"use client";

import { useState, useEffect } from "react";
import { getCurrentUser, getUsers } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
    const [profile, setProfile] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const currentUser = getCurrentUser();
        if (!currentUser) {
            // Redirect to home or login page if not logged in
            router.push("/");
            return;
        }
        if (currentUser.verified) {
            // Redirect to profile page if already verified
            router.push(`/profile/${currentUser.username}`);
            return;
        }
        setProfile(currentUser);
    }, [router]);

    const handleVerify = () => {
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
        router.push(`/profile/${profile.username}`);
    };

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white shadow-md p-6 rounded-md text-center max-w-md">
                <h1 className="mb-4 text-2xl font-bold">Verify Your Email</h1>
                <p className="mb-6">
                    Please click the button below to verify your email address.
                </p>
                <button
                    onClick={handleVerify}
                    className="bg-black text-white hover:bg-gray-700 w-full py-2 rounded-md"
                >
                    Verify Email
                </button>
            </div>
        </div>
    );
}
