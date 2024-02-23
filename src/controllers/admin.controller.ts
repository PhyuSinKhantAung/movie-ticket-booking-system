import { Request, Response } from "express";
export default class AdminController {
  async getAdmins(req: Request, res: Response) {
    try {
      console.log("hello admins");
      res.json({ message: req.body });
    } catch (error) {
      console.log(error);
    }
  }
}
