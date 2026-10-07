import { Router } from "express";
import * as userService from './services/user.service.js'
import { authentication } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/authorization.middleware.js";

const router = Router();

router.get('/profile' ,authentication , authorize( 'admin') ,  userService.profile )
router.get('/update' ,authentication , authorize( 'admin') ,  userService.updateProfile )
// router.get('/profile' , userService.profile )




export default router