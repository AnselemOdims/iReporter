import express from 'express'
import bodyparser from 'body-parser'
import cors from 'cors'

const app = express();

app.use(cors())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended:false }))

app.get('/', function(req, res){
    res.send("Hello, there")
})

app.listen(3000, function(){
    console.log("Running on port 3000")
})
