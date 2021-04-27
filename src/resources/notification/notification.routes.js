import { celebrate, Joi } from "celebrate";
import { Router } from "express";
import { protect } from "../../utils/auth";
import {controller}  from './notification.controller'
const router = Router()

router.route('/')
    .post( celebrate({
        params:Joi.object({
            id: Joi.string().optional()
        })
    }), protect, controller.alertMany)

export default router