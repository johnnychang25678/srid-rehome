"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { notFound } from "next/navigation";
import { HeartIcon } from "@heroicons/react/24/solid";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getItemById } from "@/lib/utils";
import { getCart, storeCart } from "@/lib/utils";

export default function Page({ params }: { params: { id: string } }) {
  const itemId = parseInt(params.id, 10);
  const item = getItemById(itemId);
  if (!item) {
    notFound();
  }

  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);

  function addCartItem() {
    const cart = getCart();
    cart[itemId] = (cart[itemId] || 0) + 1;
    storeCart(cart);
    router.push("/marketplace/cart");
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <div className="flex flex-col-reverse">
            <Image
              alt={item.name}
              src={item.image}
              className="aspect-square w-full object-cover sm:rounded-lg"
              width={500}
              height={500}
            />
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {item.name}
            </h1>
            {item.verified && (
              <div className="mt-3">
                <Badge
                  variant="secondary"
                  className="bg-green-300 text-green-900"
                >
                  Verified Student
                </Badge>
              </div>
            )}

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                ${item.price}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>

              <div
                dangerouslySetInnerHTML={{ __html: item.description }}
                className="space-y-6 text-base text-gray-700 font-roboto text-sm"
              />
            </div>

            <form className="mt-6">
              <div className="mt-10 flex">
                <Button
                  type="button"
                  onClick={addCartItem}
                  className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                >
                  Add to bag
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="ml-4"
                >
                  <HeartIcon
                    aria-hidden="true"
                    className={`size-6 shrink-0 ${
                      isFavorite ? "text-yellow-500" : ""
                    }`}
                  />
                </Button>
              </div>
            </form>

            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="sr-only">
                Additional details
              </h2>

              <div className="divide-y divide-gray-200 border-t">
                <Accordion type="single" collapsible className="w-full">
                  {item.qas.map((qa) => (
                    <AccordionItem key={qa.id} value={qa.question}>
                      <AccordionTrigger>{qa.question}</AccordionTrigger>
                      <AccordionContent className="font-roboto text-xs">{qa.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
