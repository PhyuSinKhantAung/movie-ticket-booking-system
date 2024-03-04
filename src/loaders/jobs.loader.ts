import Agenda from "agenda";
import JobService from "src/services/job.service";

export default class JobsLoader {
  agenda = new Agenda({
    db: {
      address: process.env.MONGODB_URI ? String(process.env.MONGODB_URI) : "",
      collection: "jobs",
    },
  });
  service = new JobService();

  defineJobs() {
    this.agenda.define(
      "createSeatsForVenues",
      this.service.createSeatsForVenues,
    );
  }

  async createJobs() {
    await this.agenda.every("30 17 * * *", "createSeatsForVenues");
  }

  async jobInitialized() {
    try {
      this.defineJobs();
      await this.agenda.start();
      this.createJobs();
      await this.agenda.purge();
    } catch (error) {
      console.error(error);
    }
  }
}
