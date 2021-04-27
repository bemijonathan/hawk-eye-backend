import express from "express"
import morgan from "morgan"
import cors from 'cors'
import { json, urlencoded } from 'body-parser'
import { dbConnection } from "./config/db"
import postRoutes from "./resources/posts/post.routes"
import contactRoutes from './resources/contacts/contacts.routes'
import categoryRoutes from './resources/category/category.route'
// import { User } from "./resources/users/user.model"
import AuthRouter from "./utils/auth.route"
import { isCelebrateError } from "celebrate"
import { F } from "./utils/response"

const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))


app.use("/api/auth", AuthRouter)
app.use('/api/posts', postRoutes)
app.use('/api/contacts', contactRoutes)
app.use('/api/category', categoryRoutes)

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
        app.listen(port, () => {
            console.log(`REST API on http://localhost:${port}/api`)
        })
    } catch (e) {
        // console.error(e)
    }
}