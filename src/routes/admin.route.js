import { Router } from "express";
import { registerAdmin } from "../controllers/admin.controller.js";

const router = Router()

// router.route('/registerAdmin', registerAdmin).post()
router.post('/registerAdmin', registerAdmin)

export default router