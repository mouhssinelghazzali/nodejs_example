const { response } = require('express')
let express = require('express')
let app = express()
let session = require('express-session')




app.set("view engine","ejs")


app.use(express.urlencoded({ extended: false })) // for parsing application/x-www-form-urlencoded
app.use(express.json()) // for parsing application/json

app.set('trust proxy', 1) // trust first proxy
app.use((err, req, res, next) => {
    req.app.get('env') === 'production' 
})
app.use(session({
  secret: 'slslslslsl',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(require("./middlewares/flash"))
app.get('/', (req,res) => {
    let Message = require('./models/message')
   Message.all(function (messages) {
        res.render("pages/index", {messages: messages})
        console.log(messages)
    })
 
   

})

app.post('/', (req,res) => {
    let message = req.body.message

    if(message = undefined ||  message === '')
    {   
        req.flash('error',"Vous n'avez pas posté de message")
        res.redirect('/')
        
    }
    else {

        let Message = require('./models/message')
        Message.create(req.body.message, function () { 
            req.flash('success', "Merci !")
            res.redirect('/')
        })
    }


})

app.get("/message/:id",(req,res) => {
    let Message = require("./models/message")
    Message.find(req.params.id,function(message) {
        res.render("messages/show",{message: message})
    })
})
app.listen(8080)