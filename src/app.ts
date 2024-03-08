import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import Routes from "./routes";

export default class Server {
  public app: Application;

  constructor(app?: Application) {
    this.app = app || express();
    this.config();
    new Routes(this.app);
  }

  private config(): void {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
}
