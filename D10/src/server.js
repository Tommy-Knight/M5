import express from "express"
//const express = require("express") old way of doing things

const server = express()

server.get("/test", (req, res, next))