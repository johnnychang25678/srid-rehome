"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

type Request = {
    requestDate: string;
    address: string;
    propertyType: string;
    moveInDate: string;
    mobile: string;
    instructions: string;
    selectedOrders: {
        id: string;
        productName: string;
    }[];
    status: string;
};

export default function MyRequestsPage() {
    const [requests, setRequests] = useState<Request[]>([]); // State to store requests

    // Load requests from localStorage
    useEffect(() => {
        const storedRequests = localStorage.getItem("furnishingRequests");
        if (storedRequests) {
            console.log("parsed", JSON.parse(storedRequests))
            setRequests(JSON.parse(storedRequests));
        }
    }, []);

    // Log requests when they change
    useEffect(() => {
        console.log("Updated Requests State:", requests);
    }, [requests]);

    return (
        <div className="flex flex-col items-center min-h-screen">
            {/* Page Title */}
            <h1 className="text-2xl font-bold mb-6 text-center">My Requests</h1>

            {/* Requests List */}
            <div className="space-y-4 w-full max-w-md">
                {requests.length === 0 ? (
                    <p className="text-gray-600 text-center">No requests found.</p>
                ) : (
                    requests.map((request, idx) => (
                        <Card key={idx} className="shadow-md">
                            <CardHeader>
                                <CardTitle>Request {request.requestDate}</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm space-y-2">
                                <p>
                                    <strong>Items:</strong>{" "}
                                    {request.selectedOrders.map((order) => order.productName).join(", ")}
                                </p>
                                <p>
                                    <strong>Address:</strong> {request.address}
                                </p>
                                <p>
                                    <strong>Property Type:</strong> {request.propertyType}
                                </p>
                                <p>
                                    <strong>Move-in date:</strong> {request.moveInDate}
                                </p>
                                <p>
                                    <strong>Other instructions:</strong>{" "}
                                    {request.instructions || "N/A"}
                                </p>
                                <p>
                                    <strong>Status:</strong> {request.status}
                                </p>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            {/* Back Button */}
            <Link href="/furnishing-service">
                <Button variant="default" className="w-full max-w-md mt-6">
                    Back
                </Button>
            </Link>
        </div>
    );
}
