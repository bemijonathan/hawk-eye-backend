import { Joi, celebrate } from "celebrate";
import { Router } from "express";
import { protect } from "../../utils/auth";
import crudControllers, { controller } from './user.controller'
const router = Router()

router.route('/')
    .patch(celebrate({
        body: Joi.object({
            latitude: Joi.string().optional(),
            longititude: Joi.string().required().min(11),
        })
    }),
        protect,
        controller.patchLocation
    );

export default router