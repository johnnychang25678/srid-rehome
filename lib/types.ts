export type QuestionAnswer = {
  id: number;
  question: string;
  answer: string;
};

export type Item = {
  id: number;
  name: string;
  price: string; // Use string if price includes symbols like "$"
  image: string; // Path to the item's image
  description: string;
  verified: boolean;
  qas: QuestionAnswer[];
};

export type Order = {
  id: string; // should be uuid
  productName: string;
  image: string; // image path in project, e.g., images/chair.jpeg
};