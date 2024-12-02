// pages/profile/edit.js
"use client";

import { useState, useEffect } from "react";
import {getCurrentUser, getUsers} from "@/lib/utils";
import {useRouter} from "next/navigation";

export default function EditProfilePage() {
    const [profile, setProfile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const router = useRouter(); // Initialize useRouter


    useEffect(() => {
        const currentUser = getCurrentUser();
        setProfile(currentUser);
        setUsername(currentUser.username);
        setEmail(currentUser.email);
        setAvatar(currentUser.avatar);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const storedUsers = getUsers()
        let updatedCurrentUser = getCurrentUser();
        updatedCurrentUser.username = username;
        updatedCurrentUser.avatar = avatar;
        updatedCurrentUser.email = email;

        const updatedUsers = storedUsers.map((user) => {
            if (user.username === profile.username) {
                if (user.email !== email) {
                    updatedCurrentUser.verified = false;
                }
                return updatedCurrentUser
            } else {
                return user
            }
        });

        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.setItem("user", JSON.stringify(updatedCurrentUser));

        // Redirect to the profile page without refreshing
        router.push(`/profile/${username}`);

    };

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md p-6 rounded-md text-center max-w-md"
            >
                <h1 className="mb-6 text-2xl font-bold">Edit Profile</h1>

                {/* Username Field */}
                <div className="mb-4 text-left">
                    <label className="block mb-1 font-medium">Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>

                {/* Email Field */}
                <div className="mb-4 text-left">
                    <label className="block mb-1 font-medium">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>

                {/* Avatar URL Field */}
                <div className="mb-4 text-left">
                    <label className="block mb-1 font-medium">Avatar URL:</label>
                    <input
                        type="text"
                        value={avatar}
                        onChange={(e) => setAvatar(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-black text-white hover:bg-gray-700 w-full py-2 rounded-md"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}
