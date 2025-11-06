import { ICategory } from "./types";

export const CATEGORIES: ICategory[] = [
  { id: 2, name: "Apartment" },
  { id: 3, name: "House" },
  { id: 1, name: "Rooms/Co-Living" },
  { id: 4, name: "Plots" },
  { id: 20, name: "Office" },
  { id: 5, name: "Commercial propety" },
  { id: 12, name: "New construction projects" },
  { id: 11, name: "Holiday Homes" },
  { id: 13, name: "Parking" },
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
