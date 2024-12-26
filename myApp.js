let express = require('express');
let app = express();
require('dotenv')
.config();
let bodyParser = require('body-parser')

console.log('Hello world')


// app.get('/', function(req, res) {
//     res.send('Hello Express')
// })

const file = __dirname + "/views/index.html";

app.use('/public',express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:false}))



app.use(function(req, res, next){
    console.log(`${req.method} ${req.path} -  ${req.ip}`)
    next()
})


app.get('/', function(req, res){
res.sendFile(file)
})


app.get('/json', function(req, res) {

    if(process.env.MESSAGE_STYLE === 'uppercase'){

        return   res.json({"message":"Hello json".toUpperCase()})
    }

    res.json({"message":"Hello json"})
})


app.get('/now', function(req, res, next) {
    req.time = new Date().toString()
    next()
}, 
function(req,res){
    res.json({time:req.time})
}
)



app.get('/:word/echo', function(req, res){
    const { word} = req.params;
    res.json({echo:word})
})


app.post('/name', function(req, res){
    const { first, last} = req.body;
    res.json({name:`${first} ${last}`})
})


















 module.exports = app;
