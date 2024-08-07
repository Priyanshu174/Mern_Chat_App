import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { createChannel, getChannelMessages, getUserChannels } from "../controllers/ChannelController.js";

const channelsRoute = Router();

channelsRoute.post("/create-channel", verifyToken, createChannel)
channelsRoute.get("/get-user-channel", verifyToken, getUserChannels)
channelsRoute.get("/get-channel-messages/:channelId", verifyToken, getChannelMessages)

export default channelsRoute;