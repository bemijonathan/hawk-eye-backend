import { Router } from "express";
import crudControllers, { controller } from './report.controller'
import { protect } from "../../utils/auth";
import { celebrate, Joi } from "celebrate";
const router = Router()

router.route('/')
    .get(
        protect,
        controller.getReportStats
    )
    .post(celebrate({
        body: Joi.object({
            title: Joi.string().required().min(5),
            media: Joi.array().items(Joi.string().uri()),
            content: Joi.string().required().min(20)
        })
    }), protect, controller.createReport)

    router.route('/all')
    .get(
        protect,
        controller.getReports
    )
// router.route('/:id')
//     .get(crudControllers.getOne)

export default router