import express from "express";
import { GenreController } from "../controller/GenreController";




export const genreRouter = express.Router();

const genreController = new GenreController();

genreRouter.post("/CreateGenre", genreController.createGenre);
genreRouter.get("/genre/all", genreController.getGenreAll);

