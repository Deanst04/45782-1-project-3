import { Router } from "express";
import { createVacation, deleteVacation, editVacation, getVacations } from "../controllers/vacations/controller";
import validation from "../middlewares/validation";
import { createVacationValidator, editVacationValidator, idByParamsValidator } from "../controllers/vacations/validator";

const router = Router()

router.get('/', getVacations)
router.post('/', validation(createVacationValidator, "body"), createVacation)
router.patch('/:vacationId', validation(idByParamsValidator("vacationId"), "params"), validation(editVacationValidator, "body"), editVacation)
router.delete('/:vacationId', validation(idByParamsValidator("vacationId"), "params"), deleteVacation)

export default router