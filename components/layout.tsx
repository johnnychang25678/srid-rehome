import React from "react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ShoppingCart, LineChart, User, Package, Star } from "lucide-react";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <header className="sticky top-0 z-50 bg-white shadow p-4">
                <div className="flex justify-between items-center max-w-6xl mx-auto">
                    <Link href="/" className="text-black text-lg font-bold hover:underline focus:outline-none">
                        ReHome
                    </Link>

                    {/* Hamburger Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost">
                                {/* Hamburger Icon */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                </svg>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-64 p-2">
                            <DropdownMenuItem asChild>
                                <Link href="/marketplace">
                                    <div className="flex items-center space-x-3">
                                        <ShoppingCart className="h-5 w-5 text-gray-700" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Marketplace</p>
                                            <p className="text-sm text-gray-600">Buy furnitures</p>
                                        </div>
                                    </div>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/sell-items">
                                    <div className="flex items-center space-x-3">
                                        <LineChart className="h-5 w-5 text-gray-700" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Sell used items</p>
                                            <p className="text-sm text-gray-600">
                                                List your second hand items here
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </DropdownMenuItem>
                            <hr className="my-2" />
                            <DropdownMenuItem asChild>
                                <Link href="/profile">
                                    <div className="flex items-center space-x-3">
                                        <User className="h-5 w-5 text-gray-700" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">My Profile</p>
                                            <p className="text-sm text-gray-600">
                                                Manage your profile & verify your student identity
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/my-orders">
                                    <div className="flex items-center space-x-3">
                                        <Package className="h-5 w-5 text-gray-700" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">My Order</p>
                                            <p className="text-sm text-gray-600">Check your orders</p>
                                        </div>
                                    </div>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/my-listings">
                                    <div className="flex items-center space-x-3">
                                        <Star className="h-5 w-5 text-gray-700" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">My Listing</p>
                                            <p className="text-sm text-gray-600">Check your listing</p>
                                        </div>
                                    </div>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow p-4">{children}</main>
        </div>
    );
}
