
export interface SearchParameters {
  city: string;
  checkInDate: Date;
  checkOutDate: Date;
  priceLimit: number;
}

export interface Flat {
  id: string;
  title: string;
  details: string;
  photos: string[];
  coordinates: [number, number];
  bookedDates: any[];
  price: number;
}

export function cloneDate(date: Date): Date;
export function addDays(date: Date, days: number): Date;

export const backendPort: number;
export const localStorageKey: string;

export class FlatRentSdk {

  get(id: string): Promise<Flat | null>;

  search(parameters: SearchParameters): Flat[];

  book(flatId: number, checkInDate: Date, checkOutDate: Date): number;

}
