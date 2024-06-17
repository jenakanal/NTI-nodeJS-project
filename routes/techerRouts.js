const teachercontroller = require("../app/controller/teacherController")
const { authStudent, authTeacher } = require("../app/middleware/auth.middleware")
const router = require("express").Router()


// regist the teacher in app
router.post("/add", teachercontroller.addLogic)

// show my profile information
router.get("/myProfile", authTeacher, teachercontroller.myProfile)

// edit my profile 
router.get("edit",authTeacher,teachercontroller.editLogic)

// login the app
router.post("/login", teachercontroller.login)

// log out 
router.get("/logout", authTeacher, teachercontroller.logOut)
router.get("/logoutAll", authTeacher, teachercontroller.logOutAll)

// show all student to add them 
router.get("/showAllStudent", authTeacher, teachercontroller.showAllStudent)

// add student 
router.patch("/addToMe/:id", authTeacher, teachercontroller.addToMe)
router.patch("/addToMyClass/:id", authTeacher, teachercontroller.addToMyClass)

// show and delete the stedent 
router.get("/showMyStudent", authTeacher, teachercontroller.showMyStudent)
router.delete("/delMyStudent/:id", authTeacher, teachercontroller.delMyStudent)

// add and delete class
router.post("/addClass", authTeacher, teachercontroller.addClass)
router.delete("/delClass/:id", authTeacher, teachercontroller.delClass)
router.delete("/delAllClass", authTeacher, teachercontroller.delAllClass)

module.exports = router