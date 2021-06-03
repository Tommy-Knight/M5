import express from "express"
import cors from "cors"
import listEndpoints from "express-list-endpoints"
import blogsRouter from "../blogs/index.js"
import {notFoundErrorHandler,
badRequestErrorHandler,
forbiddenErrorHandler,
catchAllErrorHandler} from "../src/errorHandlers.js"

const server = express()
const { PORT } = process.env

server.use(express.json())
server.use(cors())

server.use("/blogs", blogsRouter)
console.table(listEndpoints(server))

//❌ error handlers 
server.use(notFoundErrorHandler)
server.use(badRequestErrorHandler)
server.use(forbiddenErrorHandler)
server.use(catchAllErrorHandler)

server.get("/test", (req, res, next) => {
	const { number } = req.query
	res.send({ number })
})

server.listen(PORT, () => console.log(`Listening to port: ${PORT} 🎇`))

server.on("error", (error) => console.log(`Uh oh! ${error}❌`))


