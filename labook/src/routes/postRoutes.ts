 import express from "express"
import PostController from "../controller/PostController";

export const postRouter = express.Router();

postRouter.post("/create", PostController.createPost);
postRouter.get("feed/", PostController.getFriendsFeed);
postRouter.get("/feed/all", PostController.getFeedByType);