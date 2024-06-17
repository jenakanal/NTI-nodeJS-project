const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const teacherSchema = mongoose.Schema({
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
    subject: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        trim: true,
        enum: ["male", "female"]
    },
    image: {
        type: String
    },
    addclass: [
        {
            classNum: { type: Number },
            className: { type: String },
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
teacherSchema.methods.toJSON = function () {
    const data = this.toObject()
    /* delete data.password */
    delete data.__v
    return data
}
teacherSchema.pre("save", async function () {
    if (this.isModified("password"))
        this.password = await bcrypt.hash(this.password, 10)
})
teacherSchema.statics.logme = async (email, password) => {
    const teacherData = await techerModel.findOne({ email })
    if (!teacherData) throw new Error("invalid email")
    const isPassMatch = await bcrypt.compare(password, teacherData.password)
    if (!isPassMatch) throw new Error("invalid password")
    return teacherData
}
teacherSchema.methods.generateToken = async function () {
    console.log("tmam")
    const token = jwt.sign({ _id: this._id }, process.env.jwtKey)
    this.tokens.push({ token })
    await this.save()
    return token
}





const techerModel = new mongoose.model("teacherData", teacherSchema)

module.exports = techerModel