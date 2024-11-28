"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"; // Use ShadCN Checkbox
import { Order } from "@/lib/commonTypes";
import Link from "next/link";

type SelectableOrder = Order & { selected: boolean }

export default function RequestService() {
    const [orders, setOrders] = useState<SelectableOrder[]>([]); // Orders state

    // Load orders from localStorage
    useEffect(() => {
        const storedOrders = localStorage.getItem("orders");
        if (storedOrders) {
            // Parse the stored data and map to add `selected` property
            const parsedOrders: Order[] = JSON.parse(storedOrders);
            const selectableOrders: SelectableOrder[] = parsedOrders.map((order) => ({
                ...order,
                selected: false, // Default to false
            }));
            setOrders(selectableOrders);
        }
    }, []);

    // Toggle order selection
    const handleSelect = (id: string) => {
        const updatedOrders = orders.map((order) =>
            order.id === id ? { ...order, selected: !order.selected } : order
        );
        setOrders(updatedOrders);
    };


    return (
        <div className="flex flex-col items-center min-h-screen p-4 bg-gray-50">
            {/* Page Title */}
            <h1 className="text-2xl font-bold mb-6 text-center">
                Choose an Order for Furnishing Service
            </h1>

            {/* Orders List */}
            <div className="grid grid-cols-1 gap-6 w-full max-w-md">
                {orders.map((order) => (
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
                ))}
            </div>

            {/* Continue Button */}
            <Link href="/furnishing-service/request-service/request-form">
                <Button
                    onClick={() => { }}
                    className="bg-black text-white hover:bg-gray-700 w-full max-w-md mt-6"
                >
                    Continue
                </Button>
            </Link>
        </div>
    );
}
