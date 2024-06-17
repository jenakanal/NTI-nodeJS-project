require("dotenv").config()
require("./database/connection")

const app = require("./app/source")

app.listen(process.env.port, () => console.log(process.env.appURL))


