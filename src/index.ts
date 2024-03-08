import dotenv from "dotenv";
dotenv.config();
import { Application } from "express";
import Server from "./app";
import mongoose from "mongoose";

// const app: Application = express();
// new Server(app);

export const initApp = (): Application => {
  const server = new Server(); // Initializes and configures the application
  return server.app;
};

const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const init = async () => {
  await connectToDatabase();
  const app = initApp();
  const server = app
    .listen(port, () => {
      console.log(`Server is running on port ${port}.`);
    })
    .on("error", (err: Error) => {
      console.log("Uncaught Exception", err.stack);
      console.log("Server has been shut down!");

      server.close(() => {
        console.log("Sever is closed");
        process.exit(1);
      });
    });
};

const connectToDatabase = async () => {
  try {
    const mongourl: string = process.env.MONGODB_URI
      ? String(process.env.MONGODB_URI)
      : "";
    await mongoose.connect(mongourl);
    console.log("Connected to database successfully!");
  } catch (error) {
    console.error("Mongoose connection error", error);
    console.log("Server has been shut down!");
    process.exit(1);
  }
};

init();
