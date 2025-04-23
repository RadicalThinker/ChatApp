import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { getMessages, getUsers, sendMessage } from '../controllers/messageControllers.js';


const router = express.Router();

router.get("/users",protectRoute,getUsers);
router.get("/:id",protectRoute,getMessages);

router.post("/send-message/:id",protectRoute,sendMessage);


export default router;