// import aws from 'aws-sdk';

import twilio from "twilio";
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
        
        await sendEmail({ mailOptions, to: [...recepients], data: datas, template }, saveAlert);
    }

    /**
     * 
     * @param {*} message 
     * @param {*} recipients 
     * @param {*} userInfo 
     */
    static async sendSMS(t_message, recipients, userInfo) {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = require('twilio')(accountSid, authToken);
        let groupMembers = recipients.filter(e => {
            if (e) {
                return e;
            }
        })
        const message =
            `Hello ${userInfo.firstName}
            ${userInfo.lastName}, is asking for your help he/she may be in a serious trouble (${userInfo.category}). Please Get to him/her as soon as possible, Help Save a live today 
            Last Map cordinates : https://www.google.com/maps/search/?api=1&query=${userInfo.latitude},${userInfo.longitude};
            Phone ${userInfo.phoneNumber}
            `
        Promise.all(groupMembers.map((individual, i) => {
            if(individual.startsWith('0')){
                individual = individual.replace('0', '+234')
            }
            return client.messages.create({
                to: individual,
                body: message,
                name: 'EYE OF THE HAWK',
                from: process.env.TWILIO_PHONE_NUMBER
            });
        }))
            .then((results) => {
                console.log('success', results);
            })
            .catch((err) => {
                console.log(err);

            });
    }

    static async sendTweet(message) {

    }

    static async sendFacbook(message) {

    }

    //add url shortener here
    static async UrlShortener() {

    }
}