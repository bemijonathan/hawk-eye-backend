import { celebrate, Joi } from "celebrate";
import { Router } from "express";
import { controller } from './category.controller'
const router = Router()

router.route('/')
    .get(controller.getAll)
    .post(celebrate({
        body:Joi.object({
            title: Joi.string()
        })
    }), controller.create)

// router.route('/:id')
//     .get(controller.getOne)
//     .put(controller.updateOne)
//     .delete(controller.removeOne)

export default router