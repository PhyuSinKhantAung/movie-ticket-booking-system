import supertest from "supertest";
import { initApp } from "../index";

describe("theatre", () => {
  describe("get theatre route", () => {
    describe("given the theatre does not exist", () => {
      it("should return 400", async () => {
        // expect(true).toBe(true);
        const app = initApp();
        const res = await supertest(app).get("/api/theatres/123456");
        expect(res.statusCode).toBe(400);
      });
    });
  });
});
