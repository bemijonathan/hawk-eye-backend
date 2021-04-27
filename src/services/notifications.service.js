// import aws from 'aws-sdk';

import { createEmailPayload, forgotPasswordMail, sendEmail } from "../utils/mailer";




export class Notification {

    /**
     * 
     * @param {*} title  the title / subject of the mail
     * @param {array} recepients  the recipients of the mail
     * @param {*} data image video etc .
     */
    // this is the one for sending Alerts
    static async sendEmails(template, recepients, data) {
        const mailOptions = createEmailPayload()
        const saveAlert = (e, boolean) => {
            // do what ever you want good to tell the users the failed ones
        }
        const datas = Array(recepients.length).fill(data)
        console.log(datas)
        await sendEmail({ mailOptions, to: [...recepients], data:datas, template }, saveAlert);
    }

    static async sendSMS(message, recipients) {
        
    }

    static async sendTweet(message) {

    }

    static async sendFacbook(message) {

    }
}