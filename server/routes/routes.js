
import UserController from '../controllers/UserController'
import RedflagController from '../controllers/red-flagController'
import InterventionController from '../controllers/interventionController'
import validateRegisterUser from '../middlewares/registerValidation'
import validateRedFlagReport from '../middlewares/redflagValidation'
import validateInterventionReport from '../middlewares/interventionValidation'

import validateLoginUser from '../middlewares/loginValidation'
import auth from '../middlewares/auth';




const EntryRoute = (app) => {
    app.post('/api/v1/signup', validateRegisterUser, UserController.createUser);
    app.post('/api/v1/login', validateLoginUser, UserController.loginUser);
    app.get('/api/v1/get-user/:id', auth.verifyUserToken, UserController.getUser);


    app.post('/api/v1/create-red-flag', auth.verifyUserToken, validateRedFlagReport, RedflagController.createRedFlag);
    app.get('/api/v1/get-red-flags', auth.verifyUserToken, RedflagController.getAllRedFlags);
    app.get('/api/v1/get-red-flag/:id', auth.verifyUserToken, RedflagController.getSingleRedFlag);
    app.put('/api/v1/edit-red-flag/:id', auth.verifyUserToken, validateRedFlagReport, RedflagController.editRedFlag);
    app.delete('/api/v1/delete-red-flag/:id', auth.verifyUserToken, RedflagController.deleteRedFlag);

    app.post('/api/v1/create-intervention', auth.verifyUserToken, validateInterventionReport, InterventionController.createIntervention);
    app.get('/api/v1/get-interventions', auth.verifyUserToken, InterventionController.getAllInterventions);
    app.get('/api/v1/get-intervention/:id', auth.verifyUserToken, InterventionController.getSingleIntervention);
    app.put('/api/v1/edit-intervention/:id', auth.verifyUserToken, validateInterventionReport, InterventionController.editIntervention);
    app.delete('/api/v1/delete-intervention/:id', auth.verifyUserToken, InterventionController.deleteIntervention);








       
}


export default EntryRoute;





