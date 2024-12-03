import { Item, Profile } from "@/lib/types";

export const mockItems: Item[] = [
  {
    id: 1,
    name: "Table",
    price: 40,
    image: "/images/table.jpeg",
    description: "a table",
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
    description: "a chair",
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
    description: "a couch",
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
    description: "a tv stand",
    verified: true,
    qas: [],
  },
  {
    id: 5,
    name: "Bed",
    price: 90,
    image: "/images/bed.jpeg",
    description: "a bed",
    verified: true,
    qas: [],
  },
  {
    id: 6,
    name: "Red Chair",
    price: 10,
    image: "/images/red_chair.png",
    description: "a red chair",
    verified: true,
    qas: [],
  },
];

export const mockUsers: Profile[] = [
  {
    verified: true,
    email: "johndoe@example.com",
    username: "JohnDoe",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    verified: false,
    email: "janedoe@example.com",
    username: "JaneDoe",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    verified: true,
    email: "mikejones@example.com",
    username: "Mike Jones",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    verified: false,
    email: "sarahsmith@example.com",
    username: "SarahSmith",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    verified: false,
    email: "alexjohnson@example.com",
    username: "AlexJohnson",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
  },
];
