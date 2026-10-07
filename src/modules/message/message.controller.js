import { Router  } from "express";
import * as messageServices from './services/message.service.js'
const router = Router ();

router.get('/' , messageServices.getAllMessages)

export default router;