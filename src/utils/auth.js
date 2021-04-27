import config from '../config/secrets'
import { User } from '../resources/users/user.model'
import jwt from 'jsonwebtoken'
import { forgotPasswordMail, TokenForPassword, verifyEmailToken } from "./mailer";
import { F, s } from './response'


export const newToken = user => {
    return jwt.sign({ id: user.id }, process.env.JWT_TOKEN, {
        expiresIn: process.env.JWT_TIME
    })
}

export const verifyToken = token =>
    new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_TOKEN, (err, payload) => {
            if (err) return reject(err)
            resolve(payload)
        })
    })

export const signup = async (req, res) => {
    try {

        let user = await User.findOne({ email: req.body.email })
        if(user){
            return F.unprocessedEntity(res, 'user already exists')
        }
        user = await User.create(req.body)
        const token = newToken(user)
        return s(res, 201, true, { token }, "successful")
    } catch (e) {
        return F.serverError(res)
    }
}

export const signin = async (req, res) => {
    const invalid = 'Invalid email or password'
    try {
        const user = await User.findOne({ email: req.body.email })
            .select('email password')
            .exec()
        if (!user) {
            return F.unauthenticated(res, invalid)
        }
        const match = await user.checkPassword(req.body.password)
        if (!match) {
            return F.unauthenticated(res, invalid)
        }
        const token = newToken(user)
        return s(res, 200, true, { token }, "success")
    } catch (e) {
        F.serverError(res)
    }
}

export const protect = async (req, res, next) => {
    const bearer = req.headers.authorization

    if (!bearer || !bearer.startsWith('Bearer ')) {
        return F.unauthenticated(res)
    }

    const token = bearer.split('Bearer ')[1].trim()
    let payload
    try {
        payload = await verifyToken(token)
    } catch (e) {
        return F.unauthenticated(res)
    }

    const user = await User.findById(payload.id)
        .select('-password')
        .lean()
        .exec()

    if (!user) {
        return F.unauthenticated(res)
    }

    req.user = user
    next()
}


export const newEmail = async (req, res) => {
    let user;
    try {
        let userId = await verifyEmailToken(req.headers.recoverytoken);
        user = await User.findOne({ _id: userId }).exec();
        if (req.headers.recoverytoken === user.token.recoveryToken.toString()) {
            let password = await user.newPassword(req.body.password)
            let response = await User.findByIdAndUpdate(
                { _id: userId },
                { password, $set: { 'token.recoveryToken': "" } },
                { new: true })
            res.status(201).send({ data: newToken(response) })
        } else {
            return res.status(400).send({ error: "" });
        }
    } catch (error) {
        res.status(400).send({ error, details: "user not found" });
    }
}


export const forgotEmail = async (req, res) => {
    const email = req.body.email;
    try {
        const user = await User.findOne({ email })
            .select("email id token")
            .exec();
        if (user) {
            let token = TokenForPassword(user);
            if (forgotPasswordMail(user.email, token)) {
                user.token.recoveryToken = token;
                await user.save();
                res.status(200).send({ data: "mail sent" });
            } else {
                res.status(400).end();
            }
        } else {
            return res.status(400).end()
        }
    } catch (e) {
        res.status(400).end();
    }
}