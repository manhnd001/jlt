import express from "express";
import cors from "cors";
import morgan from "morgan";
import { audioRouter } from "./routes/audio.js";

export function createApp() {
  const app = express();

  const allowedOrigin = process.env.CLIENT_ORIGIN || "*";

  app.use(cors({ origin: allowedOrigin }));
  app.use(express.json());
  app.use(morgan("dev"));

  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api/audio", audioRouter);

  app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
      message: err.message || "Internal server error",
    });
  });

  return app;
}
