// backend/src/index.ts
import express from "express";
import cors from "cors";
import { audioRouter } from "./routes/audio.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/audio", audioRouter);

app.listen(4000, () => console.log("Server running on http://localhost:4000"));
