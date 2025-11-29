import { Router } from "express";
import { createVacation, deleteVacation, editVacation, generateCsv, getVacations, getVacationsFollowersCount } from "../controllers/vacations/controller";
import validation from "../middlewares/validation";
import { createVacationValidator, editVacationImageValidation, editVacationValidator, idByParamsValidator, newVacationImageValidation } from "../controllers/vacations/validator";
import enforceAdmin from "../middlewares/enforce-admin";
import fileUploader from "../middlewares/file-uploader";

const router = Router()

router.get('/', getVacations)
router.post('/', enforceAdmin, validation(createVacationValidator, "body"), validation(newVacationImageValidation, 'files'), fileUploader, createVacation)
router.patch('/:vacationId', enforceAdmin, validation(idByParamsValidator("vacationId"), "params"), validation(editVacationValidator, "body"), validation(editVacationImageValidation, 'files'), fileUploader, editVacation)
router.delete('/:vacationId', enforceAdmin, validation(idByParamsValidator("vacationId"), "params"), deleteVacation)
router.get('/followers-count', enforceAdmin, getVacationsFollowersCount)
router.get('/export-csv', enforceAdmin, generateCsv)

export default router