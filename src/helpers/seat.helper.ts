export const reshapedSeatStructure = (
  rows: number,
  cols: number,
  showtime: string,
) => {
  const seats = Array.from({ length: rows * cols }).reduce((acc, _, index) => {
    const row = Math.floor(index / cols) + 1;
    const column = (index % 10) + 1;
    console.log(row, column);

    const seatPrices = {
      A: 3000,
      B: 3500,
      C: 4500,
      D: 5000,
      E: 6500,
      F: 12000,
    };
    const price = seatPrices[String.fromCharCode(64 + row)];

    acc.push({
      type: price >= 12000 ? "double" : "single",
      number: `${String.fromCharCode(64 + row)}${column}`,
      price,
      showtime,
      status: "empty",
    });
    return acc;
  }, []);

  return seats;
};
