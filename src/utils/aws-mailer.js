

// const  aws = require('aws-sdk')

// const env = require('dotenv').config()

// aws.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: "us-east-1"
// })

// var sender = "bemijonathan@gmail.com";
// var recipient = "bemijonathan@gmail.com";
// var subject = "Amazon SES Test (AWS SDK for JavaScript in Node.js)";
// var body_text = "Amazon SES Test (SDK for JavaScript in Node.js)\r\n"
//   + "This email was sent with Amazon SES using the "
//   + "AWS SDK for JavaScript in Node.js.";
// var body_html = `<html>
// <head></head>
// <body>
//   <h1>Amazon SES Test (SDK for JavaScript in Node.js)</h1>
//   <p>This email was sent with
//     <a href='https://aws.amazon.com/ses/'>Amazon SES</a> using the
//     <a href='https://aws.amazon.com/sdk-for-node-js/'>
//       AWS SDK for JavaScript in Node.js</a>.</p>
// </body>
// </html>`;
// var charset = "UTF-8";

// var ses = new aws.SES();

// // Specify the parameters to pass to the API.
// var params = {
//   Source: sender,
//   Destination: {
//     ToAddresses: [
//       recipient
//     ],
//   },
//   Message: {
//     Subject: {
//       Data: subject,
//       Charset: charset
//     },
//     Body: {
//       Text: {
//         Data: body_text,
//         Charset: charset
//       },
//       Html: {
//         Data: body_html,
//         Charset: charset
//       }
//     }
//   },
//   // ConfigurationSetName: configuration_set
// };

// //Try to send the email.
// var sendMail = () => {
//   ses.sendEmail(params, function (err, data) {
//     if (err) {
//       console.log(err.message);
//     } else {
//       console.log("Email sent! Message ID: ", data.MessageId);
//     }
//   })
// };

// sendMail()