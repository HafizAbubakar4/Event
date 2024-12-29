const express = require("express")
const app = express()

const PORT = 8000
app.listen(PORT, () => {
    console.log("Seraver is running perfectly on port :", PORT)
})