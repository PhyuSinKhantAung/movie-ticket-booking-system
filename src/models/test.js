function pre(numDaysAhead, numRows, numColumns, timeSlots) {
  const currentDate = new Date();
  const targetDate = new Date(
    currentDate.getTime() + numDaysAhead * 24 * 60 * 60 * 1000,
  );
  const targetDateString = targetDate.toISOString().split("T")[0];

  const theaters = [
    {
      _id: 1,
      name: "JCGV",
    },
    {
      _id: 2,
      name: "Mingalar",
    },
  ];
  const seats = [];

  for (const theater of theaters) {
    for (const timeSlot of timeSlots) {
      for (let row = 1; row <= numRows; row++) {
        for (let column = 1; column <= numColumns; column++) {
          seats.push({
            theater_id: theater._id,
            row: row.toString(),
            column: column,
            seat_number: `${String.fromCharCode(64 + row)}${column}`,
            seat_type: "standard",
            stauts: "available",
            price: 10.99,
            date: targetDateString,
            time: timeSlot,
          });
        }
      }
    }
  }
  console.log(seats);
}
