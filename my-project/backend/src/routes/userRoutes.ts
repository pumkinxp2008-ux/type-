import { Router } from "express";
import { sign, check, create, pet, colors } from "../controllers/userController";

const router = Router();

router.post("/sign", sign);
router.post("/check", check);
router.post("/create", create);
router.post("/pet", pet);
router.post("/colors", colors);

export default router;