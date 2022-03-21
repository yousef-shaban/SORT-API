import express from "express"
import errorHandlerMiddleware from "./middleware/error-handler.js"
import notFound from "./middleware/not-found.js"
import CRouter from "./Routers/router.js"
import connectDB from "./model/db.js"
// import { find } from "./Model/data.js"
// require("dotenv").config()
import {} from "dotenv/config"
const uri = process.env.MONGOOSE_URI

const app = express()


app.use(express.static("./View"))
app.use(express.json())


app.use("/api/v2/", CRouter)
// custom middleware
app.use(errorHandlerMiddleware)

app.use(notFound)

// app.get("/api", (req, res, next) =>
// {
//     console.log(req.body.msg);
//     res.send("home")
// }
// )

const start = async () => {
    try {
        await connectDB(process.env.MONGOOSE_URI).then(console.log("connecting to the database"))
        
        app.listen(3000, ()=>{
            console.log("Listening on Port 3000");
        })

    } catch (error) {
        console.log(error);
    }
}
start()
