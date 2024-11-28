"use client";

import React from "react";
import { useForm } from "react-hook-form"; // For form validation
import { z } from "zod"; // For schema validation
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Link from "next/link";

// Define form schema with Zod
const formSchema = z.object({
    address: z.string().min(1, "Property address is required"),
    propertyType: z.string().min(1, "Property type is required"),
    moveInDate: z.string().min(1, "Move-in date is required"),
    mobile: z.string().min(1, "Mobile number is required")
        .regex(
            /^\d{3}-\d{3}-\d{4}$/,
            "Invalid US phone number format"
        ),
    instructions: z.string().optional(),
});

// Format phone number with dashes
const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters
    const numericValue = value.replace(/\D/g, "");

    // Format the string as `123-456-7890`
    if (numericValue.length <= 3) return numericValue;
    if (numericValue.length <= 6) {
        return `${numericValue.slice(0, 3)}-${numericValue.slice(3)}`;
    }
    return `${numericValue.slice(0, 3)}-${numericValue.slice(3, 6)}-${numericValue.slice(6, 10)}`;
};


type FormValues = z.infer<typeof formSchema>;

export default function RequestForm() {
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

    const onSubmit = (data: FormValues) => {
        console.log("Form submitted:", data);
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
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
                                            <SelectItem value="Studio">Studio</SelectItem>
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
                                    <FormLabel>Move-in Date (yyyy/mm/dd)*</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
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
                <Link href="/" passHref>
                    <Button variant="ghost" className="w-full mt-4">
                        Back
                    </Button>
                </Link>
            </div>
        </div>
    );
}
