export interface Ingredient {
  id: number;
  name: string;
  quantity: number;
  cost: number;
}

export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  ingredients: Ingredient[];
}
