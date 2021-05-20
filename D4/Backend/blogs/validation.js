import { body } from "express-validator"

export const blogpostValidation = [
	body("category")
		.exists()
		.withMessage("Category is missing")
		.isString()
		.withMessage("Category format incorrect")
		.notEmpty()
		.withMessage("Category is empty"),
	body("title")
		.exists()
		.withMessage("Title is missing")
		.isString()
		.withMessage("Title format incorrect")
		.notEmpty()
		.withMessage("Title is empty"),
	body("content")
		.exists()
		.withMessage("Content is missing")
		.isString()
		.withMessage("Content format incorrect")
		.notEmpty()
		.withMessage("Content is empty"),
]