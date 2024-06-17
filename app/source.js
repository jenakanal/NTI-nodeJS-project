const express = require("express")
const app = express()
const cors = require("cors")

app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const teacherRoutes = require("../routes/techerRouts")
app.use("/techer", teacherRoutes)

const studentRoutes = require("../routes/studentRouts")
app.use("/student", studentRoutes)

module.exports = app