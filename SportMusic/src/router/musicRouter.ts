import express from "express";
import { MusicController } from "../controller/MusicController";



export const musicRouter = express.Router();

const musicController = new MusicController();

musicRouter.post("/createMusic", musicController.createMusic);
musicRouter.get("/all", musicController.getAllMusic);
musicRouter.get("/:id", musicController.getMusicById);
musicRouter .delete("/delete/:id",musicController.deleteMusicId);
