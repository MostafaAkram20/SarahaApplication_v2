import { Router } from "express";
import * as registrationService from "./service/registration.service.js";
const router = Router();

router.post('/signup' , registrationService.signup)
router.get('/confirm-email' , registrationService.ConfirmEmail)
router.post('/login' , registrationService.login)

export default router;