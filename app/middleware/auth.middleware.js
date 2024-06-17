const studentModel = require("../../database/models/studentModel")
const teacherModel = require("../../database/models/teacherModel")
const jwt = require("jsonwebtoken")
const { resGenerator } = require("../helper")

const authStudent = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("bearer", "")
        const notHashToken = jwt.verify(token, process.env.jwtKey)
        const studentData = await studentModel.findOne({
            _id: notHashToken._id,
            "tokens.token": token
        })
        if (!studentData) throw new Error("unathorization")
        req.student = studentData
        req.token = token
        next()
    }
    catch (e) {
        resGenerator(res, 500, false, "authorization false", e.message)
    }
}

const authTeacher = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("bearer", "")
        const notHashToken = jwt.verify(token, process.env.jwtKey)
        const teacherData = await teacherModel.findOne({
            _id: notHashToken._id,
            "tokens.token": token
        })
        if (!teacherData) throw new Error("unathorization")
        req.teacher = teacherData
        req.token = token
        next()
    }
    catch (e) {
        resGenerator(res, 500, false, "authorization false", e.message)
    }
}

module.exports = { authStudent, authTeacher }