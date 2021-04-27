// password ->  email ->  token (exp 5min) -> verify  ->  newpassword token

import { celebrate, Joi } from "celebrate";
import { Router } from "express";
import { signin, signup, forgotEmail, newEmail } from "./auth";

const AuthRouter = Router();

AuthRouter.route("/recovery")
  .post(forgotEmail)
  .put(newEmail);

AuthRouter.route('/signup')
  .post(celebrate({
    body: {
      email: Joi.string().required().email().trim(),
      password: Joi.string().required().min(6).trim(),
      phoneNumber: Joi.string().required().trim().min(11).replace('+', ""),
      firstName: Joi.string().required().trim(),
      lastName: Joi.string().required().trim()
    }
  }), signup);

AuthRouter.route("/signin")
  .post(celebrate({
    body: {
      email: Joi.string().required().email().trim(),
      password: Joi.string().required().min(6).trim()
    }
  }), signin)

export default AuthRouter