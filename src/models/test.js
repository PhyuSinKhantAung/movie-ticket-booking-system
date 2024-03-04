// function pre() {
//   const currentDate = new Date();
//   const targetDate = new Date(
//     currentDate.getTime() + 5 * 24 * 60 * 60 * 1000,
//   );
//   const targetDateString = targetDate.toISOString().split("T")[0];

//   const theaters = [
//     {
//       _id: 1,
//       theatre: "JCGV",
//       row: 4,
//       column: 10,
//     },
//     {
//       _id: 2,
//       theatre: "Mingalar",
//       row: 5,
//       column: 10
//     },
//   ];

//   const movies = [
//     {
//       name: 'spider',
//       duration: 10000,
//       showtimes: ['10AM', '12AM', '3AM']
//     },
//     {
//       name: 'batman',
//       duration: 20000,
//       showtimes: ['10AM', '3AM']
//     }
//   ]
//   const seats = [];



//   for (const theater of theaters) {
//     for (const movie of movies) {
//       for (const timeSlot of movie.showtimes) {
//         for (let row = 1; row <= theater.row; row++) {
//           for (let column = 1; column <= theater.column; column++) {
//             seats.push({
//               theater: theater.theatre,
//               row: row.toString(),
//               column: column,
//               seat_number: `${String.fromCharCode(64 + row)}${column}`,
//               seat_type: "standard",
//               stauts: "available",
//               price: 10.99,
//               date: targetDateString,
//               time: timeSlot,
//               movie: movie.name
//             });
//           }
//         }
//       }
//     }
//   }
//   console.log(seats);
// }


