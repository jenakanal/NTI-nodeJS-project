const { model } = require("mongoose")
const studentModel = require("../../database/models/studentModel")
const { resGenerator } = require("../helper")
class student {
    static addLogic = async (req, res) => {
        try {
            const studentData = new studentModel(req.body)
            await studentData.save()
            resGenerator(res, 200, true, "teacher added", studentData)
        }
        catch (e) {
            resGenerator(res, 500, false, "not added", e.message)
        }
    }
    static login = async (req, res) => {
        try {
            const studentData = await studentModel.logme(req.body.email, req.body.password)
            const token = await studentData.generateToken()
            resGenerator(res, 200, true, "log you hello", { studentData, token })
        }
        catch (e) {
            resGenerator(res, 500, false, "not found", e.message)
        }
    }
    static logOut = async (req, res) => {
        try {
            req.student.tokens = req.student.tokens.filter(t => t.token != req.token)
            await req.student.save()
            resGenerator(res, 200, true, "log out", req.student)
        }
        catch (e) {
            resGenerator(res, 500, false, "don't log out", e.message)
        }
    }
    static logOutAll = async (req, res) => {
        try {
            req.student.tokens = []
            await req.student.save()
            resGenerator(res, 200, true, "log out", req.student)
        }
        catch (e) {
            resGenerator(res, 500, false, "don't log out", e.message)
        }
    }
}


module.exports = student