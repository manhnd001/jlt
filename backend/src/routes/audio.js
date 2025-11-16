// backend/src/routes/audio.ts
import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const audioRouter = Router();

audioRouter.get("/", async (req, res) => {
  const audios = await prisma.audio.findMany();
  res.json(audios);
});

audioRouter.post("/", async (req, res) => {
  const { title, script, translation, url } = req.body;
  const audio = await prisma.audio.create({ data: { title, script, translation, url } });
  res.json(audio);
});
