
export interface SearchParameters {
  city: string,
  checkInDate: Date,
  checkOutDate: Date,
  priceLimit: number
}

export interface Flat {
  id: string,
  title: string,
  details: string,
  photos: string[],
  coordinates: [number, number],
  bookedDates: any[],
  price: number
}

export const database: Flat

export function cloneDate(date: Date): Date
export function addDays(date: Date, days: number): Date

export const backendPort: number
export const localStorageKey: string

export class FlatRentSdk {

  database: Flat

  public  get(id: string): Promise<Flat | null>

  public  search(parameters: SearchParameters): Flat[]

  public  book(flatId: number, checkInDate: Date, checkOutDate: Date): number

  private _assertDatesAreCorrect(checkInDate: Date, checkOutDate: Date): void

  private _resetTime(date: Date): void

  private _calculateDifferenceInDays(startDate: Date, endDate: Date): number

  private _generateDateRange(from: Date, to: Date): Date[]

  private _generateTransactionId(): number

  private _areAllDatesAvailable(flat: Flat, dateRange: Date[]): boolean

  private _formatFlatObject(flat: Flat, nightNumber: number): Flat

  private _readDatabase(): Flat | null

  private _writeDatabase(database: Flat): void

  private _syncDatabase(database: Flat): void

}
