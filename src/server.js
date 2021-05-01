import express from "express"
import morgan from "morgan"
import cors from 'cors'
import { json, urlencoded } from 'body-parser'
import { dbConnection, SetUp } from "./config/db"
// import postRoutes from "./resources/posts/post.routes"
import contactRoutes from './resources/contacts/contacts.routes'
import userRoute from './resources/users/user.route';
import categoryRoutes from './resources/category/category.route'
import notificationRoute from './resources/notification/notification.routes'
import reportRoute from './resources/Reports/report.routes'
import AuthRouter from "./utils/auth.route"
import { isCelebrateError } from "celebrate"
import { F } from "./utils/response"
import { Logger } from "./utils/logger"

const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))


app.use("/api/auth", Logger.logRequest, AuthRouter)
// app.use('/api/posts', postRoutes)
app.use('/api/contacts', Logger.logRequest, contactRoutes)
app.use('/api/category', Logger.logRequest, categoryRoutes)
app.use('/api/notification', Logger.logRequest, notificationRoute)
app.use('/api/user',  Logger.logRequest, userRoute )
app.use('/api/report', Logger.logRequest, reportRoute)

app.get('/', (req, res) => {
    res.json({
        message: "\u{1F625} what do you want"
    })
})


app.use((error, req, res, next) => {
    if (isCelebrateError(error)) {
        return F.clientError(res, error.details.get('body')?.message.replace(/"/g, ''));
    }
    return F.serverError(res, "an error occured")
});

app.use('*', (_, res) => {
    return F.notfound(res, `route not found`)
})



export const start = async (port) => {
    try {
        await dbConnection()
        await SetUp()
        app.listen(port, () => {
            console.log(`REST API on http://localhost:${port}/api`)
        })
    } catch (e) {
        // console.error(e)
    }
}