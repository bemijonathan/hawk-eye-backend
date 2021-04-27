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
    
export default router