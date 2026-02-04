import express from "express";
import albumsRouter from "./routes/albums";

export const app = express();
app.use(express.json());

app.use(albumsRouter);

app.get("/health", (req, res) => res.json({ status: "ok" }));

export default app;
