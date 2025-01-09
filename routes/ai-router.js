import express from "express";
import { authorization } from "../middleware/index.js";
import aiControllers from "../controllers/ai-controllers.js";

const aiRouter = express.Router();

aiRouter.post("/", authorization, aiControllers.createAiChat);
aiRouter.put("/", authorization, aiControllers.sendMessageToAi);
aiRouter.get("/", authorization, aiControllers.getAiChat);
aiRouter.delete("/", authorization, aiControllers.deleteAiChat);

export default aiRouter;
