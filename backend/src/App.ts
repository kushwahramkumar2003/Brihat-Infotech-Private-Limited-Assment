import express, { Express, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes";

const app: Express = express();
let reqNo = 1;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    // origin: "*",
    origin: [
      "http://localhost:3000",
      "http://localhost:8080",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

app.use("/api/v1", routes);

app.get("/", async (req: Request, res: Response) => {
  console.log("I am req : ", reqNo++);
  res.send("I am healty");
});

export default app;
