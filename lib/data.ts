import { Item, Profile } from "@/lib/types";

export const mockItems: Item[] = [
  {
    id: 1,
    name: "Table",
    price: 40,
    image: "/images/table.jpeg",
    description: "A sturdy wooden table ideal for dining or multipurpose use in small spaces.",
    verified: false,
    qas: [
      {
        id: 1,
        question: "Is it new?",
        answer: "No. It has been used for three months",
      },
      {
        id: 4,
        question: "Is it old?",
        answer: "Yes. It has been used for three months",
      },
    ],
  },
  {
    id: 2,
    name: "Chair",
    price: 20,
    image: "/images/chair.jpeg",
    description: "A sleek wooden chair with a comfortable black cushion, perfect for dining or casual seating.",
    verified: true,
    qas: [
      {
        id: 2,
        question: "Is it new?",
        answer: "No. It has been used for three months",
      },
    ],
  },
  {
    id: 3,
    name: "Couch",
    price: 120,
    image: "/images/sofa.jpeg",
    description: "A modern, gray fabric couch offering comfortable seating for a living room setup.",
    verified: true,
    qas: [
      {
        id: 3,
        question: "Is it new?",
        answer: "No. It has been used for three months",
      },
    ],
  },
];

export const moreMockItems: Item[] = [
  {
    id: 4,
    name: "TV Stand",
    price: 60,
    image: "/images/tvstand.jpeg",
    description: "A stylish gray TV stand with ample storage and an integrated electric fireplace feature, perfect for adding warmth and functionality to your living space.",
    verified: true,
    qas: [],
  },
  {
    id: 5,
    name: "Bed",
    price: 90,
    image: "/images/bed.jpeg",
    description: "A sophisticated bed frame with a tufted headboard in dark gray, offering a modern and cozy centerpiece for any bedroom.",
    verified: true,
    qas: [],
  },
];

export const mockUsers: Profile[] = [
  {
    verified: true,
    email: "johndoe@example.edu",
    username: "JohnDoe",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    verified: false,
    email: "janedoe@example.edu",
    username: "JaneDoe",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    verified: true,
    email: "mikejones@example.edu",
    username: "Mike Jones",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    verified: false,
    email: "sarahsmith@example.edu",
    username: "SarahSmith",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    verified: false,
    email: "alexjohnson@example.edu",
    username: "AlexJohnson",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
  },
];
