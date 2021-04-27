import { Joi, celebrate } from "celebrate";
import { Router } from "express";
import { protect } from "../../utils/auth";
import crudControllers, { controller } from './contacts.controller'
const router = Router()

router.route('/')
    .get(protect, crudControllers.getMany)
    .post(celebrate({
        body: Joi.object({
            name: Joi.string().optional(),
            phone: Joi.string().required().min(11),
            email: Joi.string().optional().email()
        })
    }),
        protect,
        controller.createOne
    );

router.route('/many')
    .post(
        celebrate({
            body: Joi.array().items({
                name: Joi.string().optional(),
                phone: Joi.string().required().min(11),
                email: Joi.string().optional().email().allow('')
            })
        }),
        protect,
        controller.createMany
    );

router.route('/:id')
    .get(protect, crudControllers.getOne)
    .put(protect, crudControllers.updateOne)
    .delete(protect, crudControllers.removeOne)

export default router