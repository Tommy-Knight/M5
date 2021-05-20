export const notFoundErrorHandler = (err, req, res, next) => {
	if (err.status === 404) {
		res.status(404).send("❌ 404: Error not found!")
	} else {
		next(err)
	}
}

export const badRequestErrorHandler = (err, req, res, next) => {
	if (err.status === 400) {
		res.status(400).send("❌ 400: Bad Request! ")
	} else {
		next(err)
	}
}

export const forbiddenErrorHandler = (err, req, res, next) => {
	if (err.status === 403) {
		res.status(403).send("❌ Forbidden!")
	} else {
		next(err)
	}
}

export const catchAllErrorHandler = (err, req, res, next) => {
	res.status(500).send("❌ 500!", err.errorList, err.message)
}
