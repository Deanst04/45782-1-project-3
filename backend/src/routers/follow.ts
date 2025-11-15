import { Router } from "express";
import { followVacation, getFollowedVacations, unfollowVacation } from "../controllers/follows/controller";
import validation from "../middlewares/validation";
import { followValidator, unfollowValidator } from "../controllers/follows/validator";

const router = Router()

router.get('/following', getFollowedVacations)
router.post('/follow/:id', validation(followValidator, "params"), followVacation)
router.post('/unfollow/:id', validation(unfollowValidator, "params"), unfollowVacation)

export default router