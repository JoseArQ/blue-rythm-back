import { Router } from "express";

import tokenVerify from "../middleware/tokenVerify.js";
import Validator from "../middleware/validators.js";
import playListController from "../controllers/playList-create.controller.js"
import { getPlayListController, getPlayListByIdController } from "../controllers/playList-get.controller.js";
import { getPublicPlayListController } from "../controllers/playList-publics.controller.js";
import { updatePlayList } from "../controllers/playList-update.controller.js";
import { playListRemoveController } from "../controllers/playList-remove.controller.js";
import auth from "../middleware/auth.js";

const playListRouter = Router();

playListRouter.post("/", auth, tokenVerify, playListController);
playListRouter.get("/", auth, getPlayListController);
playListRouter.get("/publics", getPublicPlayListController);
playListRouter.get("/:id", getPlayListByIdController);
playListRouter.patch("/:id", auth, tokenVerify, Validator('playlist'), updatePlayList);
playListRouter.delete("/:id", auth, playListRemoveController);

export default playListRouter;