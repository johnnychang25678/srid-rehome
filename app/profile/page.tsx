"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/utils";

export default function RedirectPage() {
    const router = useRouter();

    useEffect(() => {
        const currentUser = getCurrentUser();

        if (currentUser && currentUser.username) {
            // Redirect to the profile page
            router.push(`/profile/${currentUser.username}`);
        } else {
            // If no user is found, redirect to a fallback page (e.g., login or home)
            router.push("/");
        }
    }, [router]);

    return <div>Redirecting...</div>; // Placeholder content while redirecting
}
