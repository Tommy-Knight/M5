import cors from "cors"
import express from "express"
import listEndpoints from "express-list-endpoints"
import authorsRouter from "./authors/index.js"
import blogsRouter from "./blogs/index.js"
import {
	notFoundErrorHandler,
	badRequestErrorHandler,
	forbiddenErrorHandler,
	catchAllErrorHandler,
} from "./errorHandlers.js"

const server = express()
const port = 3069

//middleware
server.use(express.json())
server.use(cors())

//routes
server.use("/authors", authorsRouter)
server.use("/blogs", blogsRouter)
console.table(listEndpoints(server))

//❌ error handlers 
server.use(notFoundErrorHandler)
server.use(badRequestErrorHandler)
server.use(forbiddenErrorHandler)
server.use(catchAllErrorHandler)

server.listen(port, () => {
	console.log("✔ 😁 Server listening on port ", port) 
})

