import express from "express"
import fs from "fs"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import uniqid from "uniqid"
import validationResult from "express-validator"

const blogRouter = express.Router()

const blogFolderPath = dirname(fileURLToPath(import.meta.url))
const blogJSONPath = join(blogFolderPath, "blogs.json")
const content = JSON.parse(fs.readFileSync(blogJSONPath))

blogRouter.get("/", (req, res, next) => {
	try {
		res.send(content)
	} catch (error) {
		next(error)
	}
})
blogRouter.get("/:id", (req, res, next) => {
	try {
		const content = JSON.parse(fs.readFileSync(blogJSONPath))
		const result = content.find((item) => item.id === req.params.id)
		result
			? res.send(result)
			: next(createError(404, `Noo! 😭 id ${req.params.id} cannot be found!`))
	} catch (error) {
		console.log(error)
		next(error)
	}
})

blogRouter.post("/", (req, res, next) => {
	try {
		const errors = validationResult(req)
		if (errors.isEmpty()) {
			const content = JSON.parse(fs.readFileSync(blogJSONPath))
			const newBlog = { ...req.body, createdAt: new Date(), _id: uniqid() }
			content.push(newBlog)
			fs.writeFileSync(blogJSONPath, JSON.stringify(content))

			res.send(newBlog)
		} else {
			next(createError(400, [{ ...errors }]))
		}
	} catch (error) {
		next(error)
	}
})

// blogRouter.post("/", (req, res) => {
// 	const newblog = { ...req.body, createdAt: new Date(), id: uniqid() }
// 	content.push(newblog)
// 	fs.writeFileSync(blogJSONPath, JSON.stringify(content))

// 	res.send(newblog)
// })

// blogRouter.put("/:id", (req, res) => {
// 	let _me = []
// 	let _notMe = []
// 	content.find((item) =>
// 		item.id === req.params.id ? _me.push(item) : _notMe.push(item)
// 	)
// 	console.log(_me)

// 	let filtered = content.filter((blog) => blog.id !== req.params.id)
// 	let me = content.find((blog) => blog.id === req.params.id)
// 	me = { ...me, ...req.body }
// 	filtered.push(me)
// 	fs.writeFileSync(blogJSONPath, JSON.stringify(filtered))
// 	res.send(me)
// })
// blogRouter.delete("/:id", (req, res) => {
// 	const filtered = content.filter((blog) => blog.id !== req.params.id)
// 	fs.writeFileSync(blogJSONPath, JSON.stringify(filtered))
// 	res.send("Deleted")
// })

export default blogRouter
