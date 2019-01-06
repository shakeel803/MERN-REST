let express = require("express")
let app = express()
let path = require("path")
let bodyParser = require("body-parser")

// Own files
let personRoute = require("./routes/person")
let customerRoute = require("./routes/customer")

app.use(bodyParser.json())
app.use((req,res,next)=>{
    console.log(`${new Date().toString()} => ${req.originalUrl}`)
    next()
})
app.use(personRoute)
app.use(customerRoute)
app.use(express.static(__dirname + '/public'))

//Handle 404
app.use((req, res, next)=>{
    res.status(404).send('Resource not found, We think you are lost.');
})

app.use((err, req, res, next)=>{
    console.log(err.stack);
    res.sendFile(path.join(__dirname,'../public/500.html'));
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>console.info(`SERVER is running on ${PORT}`))