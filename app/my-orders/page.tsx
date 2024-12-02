"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { getOrders, getItemById } from "@/lib/utils";

export default function MyOrders() {
  const [order, setOrder] = useState<
    { id: number; count: number; timestamp: number }[]
  >([]);

  useEffect(() => {
    const savedOrder = getOrders();
    setOrder(savedOrder);
  }, []);

  function formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp);
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  return (
    <div className="bg-white">
      <div className="max-w-2xl px-4">
        <div className="flex justify-start items-center gap-x-2">
          <h1 className="text-left text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Orders
          </h1>
        </div>

        <form>
          <section>
            {order.map((order) => {
              const item = getItemById(order.id);
              if (!item) return null;
              return (
                <Link href={`/marketplace/${item.id}`} key={item.id}>
                  <Card className="mt-4">
                    <CardHeader>
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={300}
                        height={160}
                        className="w-full h-40 object-cover rounded-md"
                      />
                    </CardHeader>
                    <CardContent>
                      <CardTitle className="mb-2">{item.name}</CardTitle>
                      <CardDescription className="flex flex-col justify-between">
                        <span>Price: ${item.price}</span>
                        <span>Quantity: {order.count}</span>
                        <span>
                          Order Date: {formatTimestamp(order.timestamp)}
                        </span>
                        <span>Status: Preparing for shipping</span>
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </section>
        </form>
      </div>
    </div>
  );
}
