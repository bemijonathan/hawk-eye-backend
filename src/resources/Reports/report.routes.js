import { Router } from "express";
import  crudControllers, {controller} from './report.controller'
const router = Router()

router.route('/')
    .get(crudControllers.getMany)
    .post(controller.createReport)

// router.route('/:id')
//     .get(crudControllers.getOne)

export default router