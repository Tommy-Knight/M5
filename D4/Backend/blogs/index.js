import express from "express"
import fs from "fs"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const blogsRouter = express.Router()

const blogFolderPath = dirname(fileURLToPath(import.meta.url))
const blogJSONPath = join(blogFolderPath, "blogs.json")
const content = JSON.parse(fs.readFileSync(blogJSONPath))

blogsRouter.get("/", (req, res, next) => {
	try {
		res.send(content)
	} catch (error) {
		next(error)
	}
})

export default blogsRouter
