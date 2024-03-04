import MovieModel from "src/models/movie.model";
import SeatModel from "src/models/seat.model";
import VenueModel from "src/models/venue.model";

export default class JobService {
  SeatModel = SeatModel;
  VenueModel = VenueModel;
  MovieModel = MovieModel;

  async createSeatsForVenues() {
    const currentDate = new Date();
    const targetDate = new Date(
      currentDate.getTime() + 1 * 24 * 60 * 60 * 1000,
    );

    const venues = await VenueModel.find();
    const movies = await MovieModel.find();

    const seats = [];

    for (const venue of venues) {
      for (const movie of movies) {
        for (const timeSlot of movie.showtimes) {
          for (let row = 1; row <= venue.seatRows; row++) {
            for (let column = 1; column <= venue.seatColumns; column++) {
              seats.push({
                venue: venue._id,
                row: row.toString(),
                column: column,
                seat_number: `${String.fromCharCode(64 + row)}${column}`,
                seat_type: "standard",
                stauts: "available",
                price: 10.99,
                date: targetDate,
                time: timeSlot,
                movie: movie._id,
              });
            }
          }
        }
      }
    }
  }
}
