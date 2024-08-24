import express, { Express, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import apiRoutes from "@/src/api/routes";

export const getApp = (): Express => {
  const app = express();
  app.use(express.json());

  app.use(cors());

  app.use("/api", apiRoutes);
  app.get("/", (_req: Request, res: Response) => {
    res.status(200).json({ hi: "hello world!" });
  });

  return app;
};
