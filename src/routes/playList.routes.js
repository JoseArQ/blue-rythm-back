import { Router } from "express";

import tokenVerify from "../middleware/tokenVerify.js";
import playListController from "../controllers/playList-create.controller.js"
// import { getPlayListController, getPlayListByNameController } from "../controllers/playList-get.controller.js";
import auth from "../middleware/auth.js";

const playListRouter = Router();

playListRouter.post("/", auth, tokenVerify, playListController);
// playListRouter.get("/", auth, getPlayListController);
// playListRouter.get("/:name", getPlayListByNameController);

export default playListRouter;