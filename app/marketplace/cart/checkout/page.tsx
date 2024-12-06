"use client";

import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
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
import Link from "next/link";
import { getCart, getItemById, storeCart, storeOrders } from "@/lib/utils";
import { Order } from "@/lib/types";

export default function Page() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [nameError, setNameError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);

  function handleSubmit() {
    let valid = true;
    const mobileRegex = /^[0-9]+$/;

    if (!name) {
      setNameError(true);
      valid = false;
    } else {
      setNameError(false);
    }
    if (!address) {
      setAddressError(true);
      valid = false;
    } else {
      setAddressError(false);
    }
    if (!mobile || mobile.length !== 10 || !mobileRegex.test(mobile)) {
      setMobileError(true);
      valid = false;
    } else {
      setMobileError(false);
    }
    if (valid) {
      setIsDialogOpen(true);
      const savedCart = getCart();
      // convert cart to orders
      console.log("savedCart: ", savedCart);
      const orders: Order[] = [];
      for (const [itemId, count] of Object.entries(savedCart)) {
        const item = getItemById(Number(itemId));
        if (item) {
          const order: Order = {
            ...item,
            furnishRequested: false,
            count: count,
            timestamp: Date.now(),
          };
          orders.push(order);
        }
      }
      storeOrders(orders);
      storeCart({});
    }
    const savedCart = getCart();
    // convert cart to orders
    console.log("savedCart: ", savedCart);
    const orders: Order[] = [];
    for (const [itemId, count] of Object.entries(savedCart)) {
      const item = getItemById(Number(itemId));
      if (item) {
        const order: Order = {
          ...item,
          furnishRequested: false,
          count: count,
          timestamp: Date.now(),
        };
        orders.push(order);
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
              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {nameError && (
                <span className="text-red-500 text-sm">
                  Full Name is required
                </span>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="Your Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              {addressError && (
                <span className="text-red-500 text-sm">
                  Address is required
                </span>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="mobile">Mobile</Label>
              <Input
                id="mobile"
                placeholder="123-456-7890"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              {mobileError && (
                <span className="text-red-500 text-sm">
                  Mobile is required or mobile is invalid
                </span>
              )}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Dialog open={isDialogOpen}>
          <DialogTrigger className="w-full">
            <span
              onClick={handleSubmit}
              className={`${buttonVariants()} w-full`}
            >
              Place Order
            </span>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {confirmDialog ? "Order Placed Successfully" : "Are you sure?"}
              </DialogTitle>
              <DialogDescription className="flex flex-col">
                {confirmDialog ? (
                  <>
                    <span>An invoice has been sent to your email address.</span>
                    <span className="flex justify-between mt-4">
                      <Link
                        href="/marketplace"
                        className={`${buttonVariants()}`}
                      >
                        Continue Shopping
                      </Link>
                      <Link href="/my-orders" className={`${buttonVariants()}`}>
                        View My Orders
                      </Link>
                    </span>
                  </>
                ) : (
                  <>
                    <span>Are you sure you want to place the order?</span>
                    <span className="flex justify-between mt-4">
                      <Button
                        type="button"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setConfirmDialog(true)}
                      >
                        Place Order
                      </Button>
                    </span>
                  </>
                )}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
