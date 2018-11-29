
import UserController from '../controllers/UserController'
// import ReportController from '../controllers/ReportController'
import validateRegisterUser from '../middlewares/registerValidation'
// import validateRedFlagReport from '../middlewares/reportValidation'

import validateLoginUser from '../middlewares/loginValidation'
//import validateReport from '../middlewares/reportValidation'

// const express = require("express");
// const route = express.Router();


const EntryRoute = (app) => {
 app.post('/api/v1/signup', validateRegisterUser, UserController.createUser);
app.post('/api/v1/login', validateLoginUser, UserController.loginUser);
// app.post('/api/v1/create-red-flag', validateRedFlagReport, ReportController.createRedFlag);
// app.get('/api/v1/get-red-flags', ReportController.getAllRedFlags);
// app.get('/api/v1/get-red-flag/:id', ReportController.getSpecificRedFlag);



       
}


export default EntryRoute;





