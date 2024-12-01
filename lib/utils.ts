import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Item } from "@/lib/types";
import { mockItems } from "./data";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function updateItem(item: Item) {
  const itemsJson = localStorage.getItem("items");
  let items: Record<number, Item> = {};
  if (itemsJson) {
    items = JSON.parse(itemsJson);
  }
  items[item.id] = item;
  localStorage.setItem("items", JSON.stringify(items));
}

export function getItemById(id: number): Item | undefined {
  let item;
  const itemsJson = localStorage.getItem("items");
  if (itemsJson) {
    const items = JSON.parse(itemsJson);
    item = items[id];
  }
  if (!item) {
    item = mockItems.find((item) => item.id === id);
    if (item) {
      updateItem(item);
    }
  }
  return item;
}

export function getCart(): Record<number, number> {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    return JSON.parse(savedCart);
  }
  return {};
}

export function storeCart(cart: Record<number, number>) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function getOrders() {
  const savedOrders = localStorage.getItem("orders");
  if (savedOrders) {
    return JSON.parse(savedOrders);
  }
  return {};
}

export function storeOrders(orders: Record<number, number>) {
  const savedOrders = getOrders();
  for (const [key, value] of Object.entries(orders)) {
    const id = parseInt(key, 10);
    if (savedOrders[id]) {
      savedOrders[id] += value;
    } else {
      savedOrders[id] = value;
    }
  }
  localStorage.setItem("orders", JSON.stringify(savedOrders));
}
