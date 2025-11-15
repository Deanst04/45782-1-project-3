import { Router } from "express";
import validation from "../middlewares/validation";
import { loginValidator, signupValidator } from "../controllers/auth/validator";
import { login, signup } from "../controllers/auth/controller";

const router = Router()

router.post('/signup', validation(signupValidator, "body"), signup)
router.post('/login', validation(loginValidator, "body"), login)

export default router