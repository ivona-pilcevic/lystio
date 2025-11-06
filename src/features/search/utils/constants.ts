import { ICategory } from "./types";

export const CATEGORIES: ICategory[] = [
  { id: 1, name: "Apartment" },
  { id: 2, name: "House" },
  { id: 3, name: "Commercial" },
  { id: 4, name: "Parking" },
  { id: 5, name: "Office" },
  { id: 6, name: "Land" },
  { id: 7, name: "Storage" },
];

export const MAPBOX_CONFIG = {
  token: process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string,
  language: "de",
  country: "at",
  types: [
    "address",
    "district",
    "place",
    "locality",
    "neighborhood",
    "city",
    "street",
    "poi",
  ],
};
