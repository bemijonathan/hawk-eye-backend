import nodemailer from "nodemailer"
import smtpTransport from "nodemailer-smtp-transport"
import config from "../config/secrets"
import jwt from "jsonwebtoken"
import chalk from "chalk"
import Email from 'email-templates'


//configurations
export const createEmailPayload = () => {
  const email = new Email({
    message: {
      from: 'bemijonathan@gmail.com'
    },
    send: true,
    transport: {
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: process.env.email_username, //username
        pass: process.env.email_password //password
      }
    },
    views: {
      options: {
        extension: 'ejs'
      }
    },
    preview: process.env.NODE_ENV ? false : true 
  })
  return email
}


//send mails
export const sendEmail = ({ mailOptions, to, data, template }, callback) => {
  Promise.all(
    [...to.map(
      (element, i) => {
        mailOptions
          .send({
            template,
            message: {
              to: element,
            },
            locals: data[i]
          })
          .then(e => {
            console.log(e)
            callback(e, true)
          })
          .catch(e => {
            console.log(e)
            callback(e, false)
          })
      }
    )])
}

export const forgotPasswordMail = async (email, token) => {
  let mailOptions = createEmailPayload()
  sendEmail({
    mailOptions,
    to: [email],
    data: [{ token }],
    template: 'forgotpassword'
  }, (response) => {
    console.log(chalk.yellow.bold(response, email))
    return response;
  })
}

// this generates token for forgot password
export const TokenForPassword = (user) => {
  return jwt.sign({ id: user.id }, config.JWT_EMAIL, {
    expiresIn: config.JWT_EMAIL_TIME
  })
}

export const verifyEmailToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.JWT_EMAIL, (err, payload) => {
      if (err) return reject(err)
      resolve(payload.id)
    })
  })


