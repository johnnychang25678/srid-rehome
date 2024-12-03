export type QuestionAnswer = {
  id: number;
  question: string;
  answer: string;
};

export type Item = {
  id: number;
  name: string;
  price: number;
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

export type Listing = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  timestamp: number;
};

export type Profile = {
  username: string;
  verified: boolean;
  email: string;
  avatar: string;
};
