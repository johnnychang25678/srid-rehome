"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { getCart, getItemById, storeCart, storeOrders } from "@/lib/utils";
import { Order } from "@/lib/types";

export default function Page() {
  function handleSubmit() {
    const savedCart = getCart();
    // convert cart to orders
    console.log("savedCart: ", savedCart)
    const orders: Order[] = []
    for (const [itemId, count] of Object.entries(savedCart)) {
      const item = getItemById(Number(itemId))
      if (item) {
        const order: Order = { ...item, furnishRequested: false, count: count, timestamp: Date.now() }
        orders.push(order)
      }
    }
    storeOrders(orders);
    storeCart({});
  }

  return (
    <Card className="mx-auto w-[350px]">
      <CardHeader>
        <CardTitle>Shipping Information</CardTitle>
        <CardDescription>We ship within 2 working days</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="Your Address" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="mobile">Mobile</Label>
              <Input id="mobile" placeholder="123-456-7890" />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept terms and conditions
              </label>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger className="w-full">
            <span
              onClick={handleSubmit}
              className={`${buttonVariants()} w-full`}
            >
              Save Shipping Information
            </span>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Order Placed Successfully</DialogTitle>
              <DialogDescription className="flex flex-col">
                <span>An invoice has been sent to your email address.</span>
                <span className="flex justify-between mt-4">
                  <Link href="/marketplace" className={`${buttonVariants()}`}>
                    Continue Shopping
                  </Link>
                  <Link href="/my-orders" className={`${buttonVariants()}`}>
                    View My Orders
                  </Link>
                </span>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
