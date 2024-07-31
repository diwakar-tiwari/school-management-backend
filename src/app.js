import express from "express"
import cors from "cors"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"16kb"})) //getting data from form
app.use(express.urlencoded({extended:true, limit:"16kb"})) // getting data from url
app.use(express.static("public"))

//import routes
import adminRoute from "./routes/admin.route.js"

app.use("/api/v1/users", adminRoute)


export {app}