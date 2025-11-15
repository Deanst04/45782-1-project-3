import { Router } from "express";
import { createVacation, deleteVacation, editVacation, getVacations, getVacationsFollowersCount } from "../controllers/vacations/controller";
import validation from "../middlewares/validation";
import { createVacationValidator, editVacationValidator, idByParamsValidator } from "../controllers/vacations/validator";
import enforceAdmin from "../middlewares/enforce-admin";

const router = Router()

router.get('/', getVacations)
router.post('/', enforceAdmin, validation(createVacationValidator, "body"), createVacation)
router.patch('/:vacationId', enforceAdmin, validation(idByParamsValidator("vacationId"), "params"), validation(editVacationValidator, "body"), editVacation)
router.delete('/:vacationId', enforceAdmin, validation(idByParamsValidator("vacationId"), "params"), deleteVacation)
router.get('/followers-count', enforceAdmin, getVacationsFollowersCount)

export default router