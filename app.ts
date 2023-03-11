import express, { Express, Request, Response } from "express";
import cors from "cors";
import Logger from "./middleware/logger";
import { mongoDBConnect } from "./database/connect-db";
import allRoutes from "./routes/index";
import { apiBaseUrl } from "./config/constants";

// initialize express
const app: Express = express();

//connect to mongoDB
mongoDBConnect();

app.use(express.json());

// cors
app.use(cors({ origin: true }));

app.use(express.json());

// add Logger
app.use(Logger);

app.get("/", (req: Request, res: Response) => {
  res.send("Server Check");
});

app.use(apiBaseUrl, allRoutes);

export default app;
