const student = require("../app/controller/studetController")
const studentcontroller = require("../app/controller/studetController")
const { authStudent, authTeacher } = require("../app/middleware/auth.middleware")
const router = require("express").Router()

router.post("/add", studentcontroller.addLogic)

router.post("/login", studentcontroller.login)

router.get("/logout", authStudent, studentcontroller.logOut)
router.get("/logoutAll", authStudent, studentcontroller.logOutAll)





module.exports = router