
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

app.get('/', (req, res) => {
    res.send("Hello, there. Welcome to the iReporter page. ")
})



const server = app.listen(process.env.PORT || 3000, () => {
    console.log("Listening on port 3000")
})

module.exports = server;