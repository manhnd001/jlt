import { Router } from "express";
import prisma from "../lib/prisma.js";

export const audioRouter = Router();

audioRouter.get("/", async (req, res, next) => {
  try {
    const audios = await prisma.audio.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(audios);
  } catch (error) {
    next(error);
  }
});

audioRouter.post("/", async (req, res, next) => {
  try {
    const { title, script, translation, url } = req.body;

    if (!title || !script || !translation || !url) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const audio = await prisma.audio.create({
      data: { title, script, translation, url },
    });

    res.status(201).json(audio);
  } catch (error) {
    next(error);
  }
});
