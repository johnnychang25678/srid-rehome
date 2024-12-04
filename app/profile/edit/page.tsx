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

export default function EditProfilePage() {
    const [profile, setProfile]= useState<Profile | null>(null); // Allow null for initial state
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [error, setError] = useState(""); // State for error messages
    const router = useRouter();

    useEffect(() => {
        const currentUser = getCurrentUser();
        setProfile(currentUser);
        setUsername(currentUser.username);
        setEmail(currentUser.email);
        setAvatar(currentUser.avatar);
    }, []);

    const handleUsernameChange = (e: { target: { value: any; }; }) => {
        const input = e.target.value;
        // Prevent spaces in the username
        if (/\s/.test(input)) {
            setError("Username cannot contain spaces.");
        } else {
            setError(""); // Clear error if input is valid
        }
        setUsername(input); // Automatically remove spaces
    };

    const handleEmailChange = (e: { target: { value: any; }; }) => {
        const input = e.target.value;

        // Ensure email ends with .edu
        if (!input.endsWith(".edu")) {
            setError("Only .edu email addresses are allowed.");
        } else {
            setError(""); // Clear error if input is valid
        }
        setEmail(input);
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        // Validate email one more time before submission
        if (!email.endsWith(".edu")) {
            setError("Only .edu email addresses are allowed.");
            return;
        }

        // Validate username for spaces one more time before submission
        if (/\s/.test(username)) {
            setError("Username cannot contain spaces.");
            return;
        }

        const storedUsers = getUsers();
        const updatedCurrentUser = getCurrentUser();
        updatedCurrentUser.username = username;
        updatedCurrentUser.avatar = avatar;
        updatedCurrentUser.email = email;

        const updatedUsers = storedUsers.map((user) => {
            if (profile && user.username === profile.username) {
                if (user.email !== email) {
                    updatedCurrentUser.verified = false;
                }
                return updatedCurrentUser;
            } else {
                return user;
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
                        onChange={handleUsernameChange}
                        className={`w-full border ${
                            error && error.includes("Username") ? "border-red-500" : "border-gray-300"
                        } rounded-md p-2`}
                        required
                    />
                    {error && error.includes("Username") && (
                        <p className="text-red-500 text-sm mt-1">{error}</p>
                    )}
                </div>

                {/* Email Field */}
                <div className="mb-4 text-left">
                    <label className="block mb-1 font-medium">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        className={`w-full border ${
                            error && error.includes("email") ? "border-red-500" : "border-gray-300"
                        } rounded-md p-2`}
                        required
                    />
                    {error && error.includes("email") && (
                        <p className="text-red-500 text-sm mt-1">{error}</p>
                    )}
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
                <button
                    className="bg-gray-300 text-black hover:bg-gray-400 w-full py-2 rounded-md my-2"
                    onClick={() => router.back()}
                >
                    Exit
                </button>
            </form>
        </div>
    );
}
