const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const studentSchema = mongoose.Schema({
    fName: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLenth: 20

    },
    lName: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLenth: 20
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error("invalid email format")
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    },
    school: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        trim: true,
        enum: ["male", "female"]
    },
    phone: {
        type: String,
        trim: true,
        validate(value) {
            if (!validator.isMobilePhone(value, 'ar-EG')) throw new Error("invaild phone format")
        }
    },
    degree: [
        {
            exanName: {
                type: String,
                trim: true
            }
        }
    ],
    image: {
        type: String
    },
    addToTeacher: [
        {
            teacherId: {
                type: String,
                trim: true
            }
        }
    ],
    addToTeacherClass: [
        {
            teacherClassId: {
                type: String,
                trim: true
            }
        }
    ],
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
},
    {
        timestamps: true
    }
)
studentSchema.methods.toJSON = function () {
    const data = this.toObject()
    /* delete data.password */
    delete data.__v
    return data
}
studentSchema.pre("save", async function () {
    if (this.isModified("password"))
        this.password = await bcrypt.hash(this.password, 10)
})
studentSchema.statics.logme = async (email, password) => {
    const studentData = await studentModel.findOne({ email })
    if (!studentData) throw new Error("invalid email")
    const isPassMatch = await bcrypt.compare(password, studentData.password)
    if (!isPassMatch) throw new Error("invalid password")
    return studentData
}
studentSchema.methods.generateToken = async function () {
    const token = jwt.sign({ _id: this._id }, process.env.jwtKey)
    this.tokens.push({ token })
    await this.save()
    return token
}

const studentModel = new mongoose.model("studentData", studentSchema)

module.exports = studentModel




// first id kenin = 6511d2338b7fc1df054a0013
// sec id jouleen = 6511d281513b921883e8ef6b
// third id elaria = 6511d2b84026fb4a4d826939
// four id karas = 6511d2f0b6b06ebc6199e681

// teac 1 token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTEwMzJmNTRmNWE3NDBhMjliNjIyZTQiLCJpYXQiOjE2OTU2Njc4MDV9.9wmtLQ7HSKzhl13QWUyNynEkKvvHJEljKz5HwZ8lhBI