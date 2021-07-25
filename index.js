const express = require("express")
require("./db/dbConnection")
const errorMiddleware = require("./middleware/errorMiddleware")


//Router
const userRouter = require("./router/userRouter")



const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.use("/api/users", userRouter)


app.get("/", (req, res) => {
    res.status(200).json({"message": "Welcome to the Million"})
})


app.use(errorMiddleware)

app.listen(3000, ()=> {
    console.log("3000");
})
