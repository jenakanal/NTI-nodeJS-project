const { model } = require("mongoose")
const teacherModel = require("../../database/models/teacherModel")
const studentModel = require("../../database/models/studentModel")
const { resGenerator } = require("../helper")
class teacher {
    static addLogic = async (req, res) => {
        try {
            const teachData = new teacherModel(req.body)
            await teachData.save()
            resGenerator(res, 200, true, "teacher added", teachData)
        }
        catch (e) {
            resGenerator(res, 500, false, "not added", e.message)
        }
    }
    static login = async (req, res) => {
        try {
            const teachData = await teacherModel.logme(req.body.email, req.body.password)
            const token = await teachData.generateToken()
            resGenerator(res, 200, true, "login you and hello", { teachData, token })
        }
        catch (e) {
            resGenerator(res, 500, false, "not login", e.message)
        }
    }
    static myProfile = async (req, res) => {
        try {
            console.log("profile")
            console.log({ teacher: req.teacher, token: req.token })
            resGenerator(res, 500, false, "my prifile", { teacher: req.teacher, token: req.token })
        }
        catch (e) {
            resGenerator(res, 500, false, "not found", e.message)
        }
    }
    static editLogic = async (req, res) => {
        try {
            await teacherModel.findByIdAndUpdate(req.teacher._id, req.body, { runValidators: true })
            await req.teacher.save()
            resGenerator(res, 500, false, "edit your profile", req.teacher)
        }
        catch (e) {
            resGenerator(res, 500, false, "not edit", e.message)
        }
    }
    static logOut = async (req, res) => {
        try {
            req.teacher.tokens = req.teacher.tokens.filter(t => t.token != req.token)
            await req.teacher.save()
            resGenerator(res, 200, true, "log out", req.teacher)
        }
        catch (e) {
            resGenerator(res, 500, false, "don't log out", e.message)
        }
    }
    static logOutAll = async (req, res) => {
        try {
            req.teacher.tokens = []
            await req.teacher.save()
            resGenerator(res, 200, true, "log out all dvisces", req.teacher)
        }
        catch (e) {
            resGenerator(res, 500, false, "don't log out", e.message)
        }
    }
    static showAllStudent = async (req, res) => {
        try {
            const allStudent = await studentModel.find()
            resGenerator(res, 200, true, "show all studen", allStudent)
        }
        catch (e) {
            resGenerator(res, 500, false, "don't found", e.message)
        }
    }
    static addToMe = async (req, res) => {
        try {
            console.log(req.params.id)
            const myStudent = await studentModel.findById(req.params.id.replace("id=", ""))
            if (!myStudent) throw new Error("not found")
            const teacherId = req.teacher._id
            myStudent.addToTeacher.push({ teacherId })
            await myStudent.save()
            resGenerator(res, 200, true, "stuedent added", myStudent)
        }
        catch (e) {
            resGenerator(res, 500, false, "not added", e.message)
        }
    }
    static addToMyClass = async (req, res) => {
        try {
            console.log(req.params.id)
            const myStudent = await studentModel.findById(req.params.id.replace("id=", ""))
            if (!myStudent) throw new Error("not found")
            const teacherClassId = req.teacher.addclass._id
            myStudent.addToTeacherClass.push({ teacherClassId })
            await myStudent.save()
            resGenerator(res, 200, true, "stuedent added to class", myStudent)
        }
        catch (e) {
            resGenerator(res, 500, false, "not added to class", e.message)
        }

    }
    static showMyStudent = async (req, res) => {
        try {
            const myStudents = await studentModel.findOne({ "addToTeacher.teacherId": req.teacher._id })
            console.log(myStudents)
            resGenerator(res, 200, true, "show my studen", myStudents)
        }
        catch (e) {
            resGenerator(res, 500, false, "don't show", e.message)
        }
    }
    static delMyStudent = async (req, res) => {
        try {
            const thisStudent = await studentModel.findById(req.params.id.replace("id=", ""))
            thisStudent.addToTeacher = thisStudent.addToTeacher.filter(t => t.teacherId != req.teacher._id)
            await thisStudent.save()
            resGenerator(res, 200, true, "delete student from me", thisStudent)
        }
        catch (e) {
            resGenerator(res, 500, false, "don't delete", e.message)
        }
    }
    static addClass = async (req, res) => {
        try {
            console.log("hello")
            req.teacher.addclass.push(req.body)
            await req.teacher.save()
            resGenerator(res, 200, true, "add class", req.teacher)
        }
        catch (e) {
            resGenerator(res, 500, false, "not added from class", e.message)
        }
    }
    static delClass = async (req, res) => {
        try {
            console.log(req.params.id)
            req.teacher.addclass = req.teacher.addclass.filter(c => c.id != req.params.id.replace("id=", ""))
            await req.teacher.save()
            resGenerator(res, 200, true, "delete class", req.teacher)
        }
        catch (e) {
            resGenerator(res, 500, false, "not added class", e.message)
        }
    }
    static delAllClass = async (req, res) => {
        try {
            console.log(req.params.id)
            req.teacher.addclass = []
            await req.teacher.save()
            resGenerator(res, 200, true, "delete all class", req.teacher)
        }
        catch (e) {
            resGenerator(res, 500, false, "not added class", e.message)
        }
    }
}


module.exports = teacher
