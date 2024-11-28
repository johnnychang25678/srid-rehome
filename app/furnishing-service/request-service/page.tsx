"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"; // Use ShadCN Checkbox
import { Order } from "@/lib/commonTypes";
import Link from "next/link";

type SelectableOrder = Order & { selected: boolean }

export default function RequestService() {
    const [orders, setOrders] = useState<SelectableOrder[]>([]); // keep track of orders selected state
    const [canContinue, setCanContinue] = useState(false);

    // Load orders from localStorage
    useEffect(() => {
        const storedOrders = localStorage.getItem("orders");
        if (storedOrders) {
            // Parse the stored data and map to add `selected` property
            const parsedOrders: Order[] = JSON.parse(storedOrders);
            const selectableOrders: SelectableOrder[] = parsedOrders.map((order) => ({
                ...order,
                selected: false,
            }));
            setOrders(selectableOrders);
        }
    }, []);

    useEffect(() => {
        const selectedOrders = orders.filter((order) => order.selected);
        if (selectedOrders.length > 0) {
            setCanContinue(true)
        } else {
            setCanContinue(false)
        }
    }, [orders])

    // Toggle order selection
    const handleSelect = (id: string) => {
        const updatedOrders = orders.map((order) =>
            order.id === id ? { ...order, selected: !order.selected } : order
        );
        setOrders(updatedOrders);
    };

    const handleContinue = () => {
        const selectedOrders = orders.filter((order) => order.selected); // Get selected orders
        if (selectedOrders.length > 0) {
            localStorage.setItem("selectedOrders", JSON.stringify(selectedOrders)); // Store in localStorage
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen">
            {/* Page Title */}
            <h1 className="text-2xl font-bold mb-6 text-center">
                Choose an Order for Furnishing Service
            </h1>

            {/* Orders List */}
            <div className="grid grid-cols-1 gap-6 w-full max-w-md">
                {
                    orders.length == 0 ? (<p className="text-gray-600 text-center">No orders found.</p>) : (
                        orders.map((order) => (
                            <div
                                key={order.id}
                                className="border rounded-lg p-4 shadow-md flex flex-col items-center"
                            >
                                <Image
                                    src={order.image}
                                    alt={order.productName}
                                    width={300}
                                    height={200}
                                    className="rounded-md mb-4"
                                />
                                <h2 className="text-lg font-bold mb-2">{order.productName}</h2>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`select-${order.id}`}
                                        checked={order.selected}
                                        onCheckedChange={() => handleSelect(order.id)}
                                    />
                                    <label
                                        htmlFor={`select-${order.id}`}
                                        className="text-sm font-medium text-gray-700"
                                    >
                                        Select
                                    </label>
                                </div>
                            </div>
                        ))
                    )
                }
            </div>
            <div className="flex min-w-40 justify-around">
                <Link href="/furnishing-service">
                    <Button variant="default" className="w-full max-w-md mt-6">
                        Back
                    </Button>
                </Link>

                {/* Continue Button */}
                <Link href="/furnishing-service/request-service/request-form"
                    onClick={(e) => {
                        if (!canContinue) {
                            e.preventDefault(); // Prevent navigation
                        }
                    }}
                >
                    <Button
                        onClick={handleContinue}
                        disabled={!canContinue}
                        className="bg-black text-white hover:bg-gray-700 w-full max-w-md mt-6"
                    >
                        Continue
                    </Button>
                </Link>

            </div>
        </div>
    );
}
