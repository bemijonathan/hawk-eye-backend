import nodemailer from "nodemailer"
import smtpTransport from "nodemailer-smtp-transport"
import config from "../config/secrets"
import jwt from "jsonwebtoken"
import chalk from "chalk"
import Email from 'email-templates'

// const transporter = nodemailer.createTransport(smtpTransport({
//   service: "gmail",
//   host: "smtp.gmail.com",
//   auth: {
//     user: "", // username 
//     pass: "" // password
//   }
// }))



export const createEmailPayload = (from, to, subject, template, variables) => {
  const email = new Email({
    message: {
      from
    },
    template: 'alert',
    locals: {
      ...variables
    },
    send: true,
    transport: {
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "", //username
        pass: "" //password
      }
    },
    views: {
      options: {
        extension: 'ejs'
      }
    }
  })
  return email
}


const sendEmail = ({ mailOptions, to }, callback) => {
  // transporter.sendMail(mailOptions, function (error, info) {
  //   if (error) {
  //     console.log(chalk.blueBright(error))
  //     callback(false)
  //   } else {
  //     console.log("Email sent: " + info.response)
  //     callback(true)
  //   }
  // })

  mailOptions
    .send({
      template: 'mars',
      message: {
        to,
      },
      locals: {
        name: 'Elon'
      }
    })
    .then(callback(true))
    .catch(callback(false));
}



export const forgotPasswordMail = async (email, token) => {
  console.log('going')
  let mailOptions = createEmailPayload(
    email,
    ['atienejonathan@gmail.com', 'yerekadonaald@gmail.com'],
    'HELO FROM MARTS', 'mars',
    { name: 'jonathan' }
  )
  sendEmail({ mailOptions, to: email }, (response) => {
    console.log(chalk.yellow.bold(response, email))
    return response
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


// forgotPasswordMail('email@gmail.com')

