import express, { type Request, type Response } from "express";
import { playerRouter } from "./players";
import { teamRouter } from "./teams";

const app = express();

app.use(express.json());

app.use("/teams", teamRouter);
app.use("/players", playerRouter);

const PORT = 4400;

app.get("/health", (_request: Request, response: Response) => {
  return response.json({
    message: "Server is active",
  });
});

app.listen(PORT, () => {
  console.log(`Server running at :${PORT}`);
});
