import { Joi, celebrate } from "celebrate";
import { Router } from "express";
import { protect } from "../../utils/auth";
import { controller } from './user.controller'
const router = Router()

router.route('/')
    .patch(celebrate({
        body: Joi.object({
            latitude: Joi.number().optional(),
            longitude: Joi.number().required(),
        })
    }),
        protect,
        controller.patchLocation
    ).get(protect, controller.getUSerDetails);

export default router