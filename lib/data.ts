import { Item } from "@/lib/types";

export const mockItems: Item[] = [
  {
    id: 1,
    name: "Table",
    price: "$40",
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
    price: "$20",
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
    price: "$120",
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
    price: "$60",
    image: "/images/tvstand.jpeg",
    description: "a tv stand",
    verified: true,
    qas: [],
  },
  {
    id: 5,
    name: "Bed",
    price: "$90",
    image: "/images/bed.jpeg",
    description: "a bed",
    verified: true,
    qas: [],
  },
];

export function getItemById(id: number): Item | undefined {
  return mockItems.find((item) => item.id === id);
}
