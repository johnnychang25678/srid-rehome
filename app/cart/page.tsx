import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { mockItems } from "@/lib/data";
import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-white">
      <div className="max-w-2xl px-4">
        <div className="flex justify-start items-center gap-x-2">
          <h1 className="text-left text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>
          <ShoppingCartIcon className="size-6" />
        </div>

        <form>
          <section aria-labelledby="cart-heading">
            {mockItems.map((item) => (
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
                    <CardDescription className="mb-2">
                      {item.name}
                    </CardDescription>
                    <CardTitle className="flex justify-between">
                      <span>{item.price}</span>
                      <span>x1</span>
                    </CardTitle>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </section>

          {/* Order summary */}
          <section aria-labelledby="summary-heading" className="mt-4">
            <div>
              <dl className="space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-base font-bold text-gray-900">
                    Subtotal
                  </dt>
                  <dd className="ml-4 text-base font-bold text-gray-900">
                    $180.00
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-4">
              <Link
                href="/cart/checkout"
                className={`${buttonVariants()} w-full rounded-md border border-transparent px-4 py-3 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50`}
              >
                Checkout
              </Link>
            </div>

            <div className="mt-6 text-center text-sm">
              <p>
                or{" "}
                <Link href="/marketplace" className="font-medium">
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </p>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}
