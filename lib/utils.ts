import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Item, Profile, Listing, Order } from "@/lib/types";
import { mockItems, mockUsers, moreMockItems } from "./data";

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

// update all items in localstorage
export function updateItems(items: Item[]) {
  localStorage.removeItem("items");
  localStorage.setItem("items", JSON.stringify(items));
}

export function getUserByUsername(username: string): Profile | undefined {
  const profilesJson = localStorage.getItem("users");
  if (profilesJson) {
    const profiles = JSON.parse(profilesJson);
    for (const p of profiles) {
      if (p.username === username) {
        return p;
      }
    }
  }
  return undefined;
}

export function getUsers(): Profile[] {
  const profilesJson = localStorage.getItem("users");
  if (profilesJson) {
    return JSON.parse(profilesJson);
  } else {
    return mockUsers;
  }
}

export function getCurrentUser(): Profile {
  const profilesJson = localStorage.getItem("users");
  if (profilesJson) {
    const profiles = JSON.parse(profilesJson);
    return profiles[profiles.length - 1];
  } else {
    const profiles = mockUsers;
    return profiles[profiles.length - 1];
  }
}

export function getItemById(id: number): Item | undefined {
  let item;
  const itemsJson = localStorage.getItem("items");
  if (itemsJson) {
    const items = JSON.parse(itemsJson);
    for (const i of Object.values(items) as Item[]) {
      if (i.id == id) {
        item = i;
        break;
      }
    }
  }
  if (!item) {
    item = [...mockItems, ...moreMockItems].find((item) => item.id === id);
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

export function getOrders(): Order[] {
  const savedOrders = localStorage.getItem("orders");
  if (savedOrders) {
    return JSON.parse(savedOrders);
  }
  return [];
}

export function storeOrders(orders: Order[]) {
  let savedOrders = getOrders();
  savedOrders = [...savedOrders, ...orders];
  localStorage.setItem("orders", JSON.stringify(savedOrders));
}

// export function storeOrders(orders: Record<number, number>) {
//   const savedOrders = getOrders();
//   for (const [key, value] of Object.entries(orders)) {
//     const id = parseInt(key, 10);
//     const order = {
//       id: id,
//       count: value,
//       timestamp: Date.now(),
//     };
//     savedOrders.push(order);
//   }
//   localStorage.setItem("orders", JSON.stringify(savedOrders));
// }

export function getListings() {
  const savedListings = localStorage.getItem("listings");
  if (savedListings) {
    return JSON.parse(savedListings);
  }
  return [];
}

export function storeOneListing(listing: Listing) {
  const savedListings = getListings();
  savedListings.push(listing);
  localStorage.setItem("listings", JSON.stringify(savedListings));
}
