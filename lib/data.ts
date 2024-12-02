import {Item, Profile} from "@/lib/types";

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
];

export const mockUsers: Profile[] = [
  {
    id: 1,
    verified: true,
    email: "johndoe@example.com",
    name: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    verified: false,
    email: "janedoe@example.com",
    name: "Jane Doe",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    verified: true,
    email: "mikejones@example.com",
    name: "Mike Jones",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    verified: false,
    email: "sarahsmith@example.com",
    name: "Sarah Smith",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: 5,
    verified: true,
    email: "alexjohnson@example.com",
    name: "Alex Johnson",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
  },
];
