import express from "express";
import { mainRouter } from "./routes/api";

export const app = express();

app.use(express.json());

app.use("/midTermAPI/v1", mainRouter);
