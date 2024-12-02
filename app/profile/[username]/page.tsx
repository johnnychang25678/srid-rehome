"use client";

import { getUserByUsername, getCurrentUser } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Page({ params }: { params: { username: string } }) {
    const username = params.username;

    const profile = getUserByUsername(username as string);
    const currentUser = getCurrentUser();

    if (!profile) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <h1 className="text-red-500 text-center text-2xl font-semibold">
                    Profile not found!
                </h1>
            </div>
        );
    }

    // Check if the current user is viewing their own profile
    const isCurrentUser = currentUser && currentUser.username === profile.username;

    return (
        <div className="flex items-start justify-center min-h-screen bg-gray-50">
            <div className="bg-white shadow-md p-6 rounded-md text-center max-w-md">
                {/* Avatar Image */}
                {profile.avatar && (
                    <div className="mb-4 flex justify-center">
                        <Image
                            src={profile.avatar}
                            alt={`${profile.username}'s avatar`}
                            width={150}
                            height={150}
                            className="rounded-full"
                        />
                    </div>
                )}
                <h1 className="mb-4 text-3xl font-bold">{profile.username}</h1>
                <p className="mb-2 text-lg">
                    <strong>Email:</strong> {profile.email}
                </p>
                <p className="text-lg">
                    <strong>Status:</strong>{" "}
                    {profile.verified ? "Verified" : "Not Verified"}
                </p>

                {/* Edit/Verify Profile Button (only for the current user) */}
                {isCurrentUser && (
                    <Link
                        href="/profile/edit"
                        className="inline-block bg-black text-white py-2 px-4 m-3 rounded-md hover:bg-gray-700"
                    >
                        Edit Profile
                    </Link>
                )}
                {isCurrentUser && !profile.verified && (
                    <Link
                        href="/profile/verify"
                        className="inline-block bg-black text-white py-2 px-4 m-3 rounded-md hover:bg-gray-700"
                    >
                        Verify Profile
                    </Link>
                )}
            </div>
        </div>
    );
}
