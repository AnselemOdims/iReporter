
import bodyparser from 'body-parser'
import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
import routes from './server/routes/routes'

dotenv.config();
const app = express();

const jsonParser = express.json();
app.use(jsonParser);

app.use(cors())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended:false }));



routes(app)

app.get('/', function(req, res){
    res.send("Hello, there")
})
// const port = process.env.PORT || 3000;

const server = app.listen(3000, function(){
    console.log("Listening on port 3000")
})

module.exports = server;