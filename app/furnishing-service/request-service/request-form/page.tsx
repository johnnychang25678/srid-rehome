"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

// Define form schema with Zod
const formSchema = z.object({
    address: z.string().min(1, "Property address is required"),
    propertyType: z.string().min(1, "Property type is required"),
    moveInDate: z.string()
        .refine(
            (value) => new Date(value) >= new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            "Move-in date is required"
        ),
    mobile: z.string().min(1, "Mobile number is required")
        .regex(
            /^\d{3}-\d{3}-\d{4}$/,
            "Invalid US phone number format"
        ),
    instructions: z.string().optional(),
});

// Format phone number with dashes
const formatPhoneNumber = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    if (numericValue.length <= 3) return numericValue;
    if (numericValue.length <= 6) {
        return `${numericValue.slice(0, 3)}-${numericValue.slice(3)}`;
    }
    return `${numericValue.slice(0, 3)}-${numericValue.slice(3, 6)}-${numericValue.slice(6, 10)}`;
};

type FormValues = z.infer<typeof formSchema>;

export default function RequestForm() {
    const [selectedOrders, setSelectedOrders] = useState([]); // For displaying selected orders
    const [isSubmitted, setIsSubmitted] = useState(false); // For showing confirmation box
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            address: "",
            propertyType: "",
            moveInDate: "",
            mobile: "",
            instructions: "",
        },
    });

    useEffect(() => {
        // Retrieve selected orders from localStorage
        const storedSelectedOrders = localStorage.getItem("selectedOrders");
        if (storedSelectedOrders) {
            setSelectedOrders(JSON.parse(storedSelectedOrders));
        }
    }, []);

    // Calculate the minimum date (3 days from today)
    const calculateMinDate = () => {
        const date = new Date();
        date.setDate(date.getDate() + 3); // Add 3 days
        return date.toISOString().split("T")[0]; // Format as yyyy-mm-dd
    };

    const [minDate] = useState<string>(calculateMinDate());

    const onSubmit = (data: FormValues) => {
        const requestWithOrders = {
            ...data,
            requestDate: new Date().toISOString().split("T")[0],
            status: "Pending",
            selectedOrders, // Include selected orders in the request
        };

        // Retrieve existing requests from localStorage
        const existingRequests = JSON.parse(localStorage.getItem("furnishingRequests") || "[]");

        // Add the new request
        const updatedRequests = [...existingRequests, requestWithOrders];
        localStorage.setItem("furnishingRequests", JSON.stringify(updatedRequests));
        localStorage.removeItem("selectedOrders");

        // Show confirmation box
        setIsSubmitted(true);
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
                {!isSubmitted ? (
                    <>
                        <h1 className="text-xl font-bold mb-4">Request Form <span className="text-red-500">(*required)</span></h1>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                {/* Property Address */}
                                <FormField
                                    name="address"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Property Address*</FormLabel>
                                            <FormControl>
                                                <Input placeholder="10 Whitman Rd., Sunnyvale, CA" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Property Type */}
                                <FormField
                                    name="propertyType"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Property Type*</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Apartment">Apartment</SelectItem>
                                                    <SelectItem value="House">House</SelectItem>
                                                    <SelectItem value="Condo">Condo</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Move-in Date */}
                                <FormField
                                    name="moveInDate"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex flex-col">
                                                <FormLabel>
                                                    Move-in Date (yyyy/mm/dd)*
                                                </FormLabel>
                                                <FormLabel>
                                                    (Must be at least 3 days from today)
                                                </FormLabel>
                                            </div>
                                            <FormControl>
                                                <Input type="date" min={minDate} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Mobile */}
                                <FormField
                                    name="mobile"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mobile*</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="tel"
                                                    placeholder="123-456-7890"
                                                    value={field.value}
                                                    onChange={(e) => field.onChange(formatPhoneNumber(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Other Instructions */}
                                <FormField
                                    name="instructions"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Other Instructions</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Enter additional instructions..." {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                {/* Submit Button */}
                                <Button type="submit" className="w-full bg-black text-white hover:bg-gray-700">
                                    Request for Service
                                </Button>
                            </form>
                        </Form>
                        {/* Back Button */}
                        <Link href="/furnishing-service/request-service" passHref>
                            <Button variant="secondary" className="w-full mt-4">
                                Back
                            </Button>
                        </Link>
                    </>
                ) : (
                    <div className="border rounded-lg p-4 text-center">
                        <div className="flex items-center justify-center mb-4">
                            <AlertCircle className="h-6 w-6 text-black mr-2" />
                            <h2 className="text-lg font-bold">Service is Requested!</h2>
                        </div>
                        <p className="text-gray-600 mb-4 font-roboto text-sm">We will contact you shortly.</p>
                        <Link href="/furnishing-service/view-requests">
                            <Button className="bg-black text-white hover:bg-gray-700">
                                View My Requests
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
