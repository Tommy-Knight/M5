import React, { Component } from "react"
import "react-quill/dist/quill.snow.css"
import ReactQuill from "react-quill"
import { Container, Form, Button } from "react-bootstrap"
import "./styles.css"
export default class NewBlogPost extends Component {
	constructor(props) {
		super(props)
		this.state = {
			post: { title: "", content: "", category: "" },
		}
	}

	handleChange = (e) => {
		if (e.target) {
			this.setState((state) => {
				return {
					post: { ...this.state.post, [e.target.id]: e.target.value },
				}
			})
		} else {
			this.setState((state) => {
				return {
					post: { ...this.state.post, ["content"]: e },
				}
			})
		}
	}

	handleSubmit(e) {
		e.preventDefault()
		this.postBlogPost()
	}

	postBlogPost = async () => {
		try {
			let res = await fetch("http://localhost:3001/blogPosts", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(this.state.post),
			})
			if (res.ok) {
				console.log("BlogPost created")
				this.props.history.push("/")
			}
		} catch (error) {
			console.log(error)
		}
	}
	render() {
		return (
			<Container className="new-blog-container">
				<Form className="mt-5">
					<Form.Group controlId="blog-form" className="mt-3">
						<Form.Label>Title</Form.Label>
						<Form.Control size="lg" placeholder="Title" />
					</Form.Group>
					<Form.Group controlId="blog-category" className="mt-3">
						<Form.Label>Category</Form.Label>
						<Form.Control size="lg" as="select">
							<option>Category1</option>
							<option>Category2</option>
							<option>Category3</option>
							<option>Category4</option>
							<option>Category5</option>
						</Form.Control>
					</Form.Group>
					<Form.Group controlId="blog-content" className="mt-3">
						<Form.Label>Blog Content</Form.Label>
						<ReactQuill
							value={this.state.text}
							onChange={this.handleChange}
							className="new-blog-content"
						/>
					</Form.Group>
					<Form.Group className="d-flex mt-3 justify-content-end">
						<Button type="reset" size="lg" variant="outline-dark">
							Reset
						</Button>
						<Button
							type="submit"
							size="lg"
							variant="dark"
							style={{ marginLeft: "1em" }}
							onClick={(e) => this.handleSubmit(e)}
						>
							Submit
						</Button>
					</Form.Group>
				</Form>
			</Container>
		)
	}
}
