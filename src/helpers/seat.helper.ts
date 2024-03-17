export interface Seat {
  number: string;
  type: string;
  status: string;
  price: number;
  showtime: string;
}

export const reshapedSeatStructure = (
  rows: number,
  cols: number,
  showtime: string,
): Seat[] => {
  const seats: Seat[] = Array.from({ length: rows * cols }).reduce(
    (seats: Seat[], _, index) => {
      const row = Math.floor(index / cols) + 1;
      const column = (index % 10) + 1;

      const seatPrices: { [key: string]: number } = {
        A: 3000,
        B: 3500,
        C: 4500,
        D: 5000,
        E: 6500,
        F: 12000,
      };
      const price = seatPrices[String.fromCharCode(64 + row)];

      seats.push({
        type: price >= 12000 ? "double" : "single",
        number: `${String.fromCharCode(64 + row)}${column}`,
        status: "empty",
        price,
        showtime,
      });
      return seats;
    },
    [],
  );

  return seats;
};
