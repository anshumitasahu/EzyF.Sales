import { Router } from "express";
import { requireAuth } from "../MiddleWare/auth";
import { upload } from "../MiddleWare/upload";
import { aiOnModel, aiTransform, uploadMultiple, uploadSingle } from "./uploadController";

const uploadRouter = Router()

uploadRouter.post("/single", requireAuth, upload.single("image"), uploadSingle);
uploadRouter.post("/multiple", requireAuth, upload.array("images", 5), uploadMultiple);
uploadRouter.post("/ai-transform", requireAuth, aiTransform);
uploadRouter.post("/ai-on-model", requireAuth, aiOnModel);

export default uploadRouter;