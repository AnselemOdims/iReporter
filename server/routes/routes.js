
import UserController from '../controllers/UserController'
import ReportController from '../controllers/ReportController'
import ReportController from '../controllers/ReportController'
import validateRegisterUser from '../middlewares/registerValidation'
import validateRedFlagReport from '../middlewares/redflagValidation'
import validateLoginUser from '../middlewares/loginValidation'
import auth from '../middlewares/auth';

//import validateReport from '../middlewares/reportValidation'



const EntryRoute = (app) => {
 app.post('/api/v1/signup', validateRegisterUser, UserController.createUser);
app.post('/api/v1/login', validateLoginUser, UserController.loginUser);

app.post('/api/v1/create-red-flag', auth.verifyUserToken, validateRedFlagReport, ReportController.createRedFlag);
app.get('/api/v1/get-red-flags', auth.verifyUserToken, ReportController.getAllRedFlags);
app.get('/api/v1/get-red-flag/:id', auth.verifyUserToken, ReportController.getSingleRedFlag);
app.put('/api/v1/edit-red-flag/:id', auth.verifyUserToken, validateRedFlagReport, ReportController.editRedFlag);
app.delete('/api/v1/delete-red-flag/:id', auth.verifyUserToken, ReportController.deleteRedFlag);





       
}


export default EntryRoute;





