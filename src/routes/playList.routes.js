import { Router } from "express";

import tokenVerify from "../middleware/tokenVerify.js";
import playListController from "../controllers/playList-create.controller.js"
import { getPlayListController } from "../controllers/playList-get.controller.js";
import { getPublicPlayListController } from "../controllers/playList-publics.controller.js";
import auth from "../middleware/auth.js";

const playListRouter = Router();

playListRouter.post("/", auth, tokenVerify, playListController);
playListRouter.get("/", auth, getPlayListController);
playListRouter.get("/publics", getPublicPlayListController);

export default playListRouter;