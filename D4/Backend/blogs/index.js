import fs from "fs"
import express from "express"
import createError from "http-errors"
import uniqid from "uniqid"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import { blogpostValidation } from "./validation.js"
import { validationResult } from "express-validator"

const blogsRouter = express.Router()
const blogFolderPath = dirname(fileURLToPath(import.meta.url))
const blogpostJSONPath = join(blogFolderPath, "blogs.json")

let blogPosts = JSON.parse(fs.readFileSync(blogpostJSONPath))

blogsRouter.get("/", (req, res, next) => {
	try {
		res.send(blogPosts)
	} catch (error) {
		next(error)
	}
})

blogsRouter.get("/:id", (req, res, next) => {
	try {
		const findID = blogPosts.find((item) => item.id === req.params.id)
		findID
			? res.send(findID)
			: res.send(
					createError(404, `❌ 404! id: ${req.params.id} cannot be found!`)
			  )
	} catch (error) {
		next(error)
	}
})

blogsRouter.post("/", blogpostValidation, (req, res, next) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			next(createError(400, { errorList: errors }))
		} else {
			const entry = { ...req.body, createdAt: new Date(), id: uniqid() }
			blogPosts.push(entry)
			res.status(201).send(blogPosts.id)
		}
	} catch (error) {
		next(error)
	}
})


blogsRouter.delete("/:id", async (req, res, next) => {
	try {
		let blogPosts = JSON.parse(fs.readFileSync(blogpostJSONPath).toString())
		const remainingBlogposts = blogPosts.filter(
			(blogpost) => blogpost.id !== req.params.id
		)
		fs.writeFileSync(blogpostJSONPath, JSON.stringify(remainingBlogposts))
		res.status(204).send("deleted")
	} catch (error) {
		next(error)
	}
})
export default blogsRouter
