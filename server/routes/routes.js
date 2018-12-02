
import UserController from '../controllers/UserController'
import RedflagController from '../controllers/red-flagController'
import InterventionController from '../controllers/interventionController'
import validateRegisterUser from '../middlewares/registerValidation'
import validateRedFlagReport from '../middlewares/redflagValidation'
import validateInterventionReport from '../middlewares/interventionValidation'

import validateLoginUser from '../middlewares/loginValidation'
import auth from '../middlewares/auth';




const EntryRoute = (app) => {
    // User API
    app.post('/api/v1/signup', validateRegisterUser, UserController.createUser);
    app.post('/api/v1/login', validateLoginUser, UserController.loginUser);
    app.get('/api/v1/users/:id', auth.verifyUserToken, UserController.getUser);

    // Red-Flag Report API
    app.post('/api/v1/red-flags', auth.verifyUserToken, validateRedFlagReport, RedflagController.createRedFlag);
    app.get('/api/v1/red-flags', auth.verifyUserToken, RedflagController.getAllRedFlags);
    app.get('/api/v1/red-flags/:id', auth.verifyUserToken, RedflagController.getSingleRedFlag);
    app.patch('/api/v1/red-flags/:id/comment', auth.verifyUserToken, validateRedFlagReport, RedflagController.editRedFlag);
    app.delete('/api/v1/red-flags/:id', auth.verifyUserToken, RedflagController.deleteRedFlag);
    app.patch('/api/v1/red-flags/:id/location', auth.verifyUserToken, validateRedFlagReport, RedflagController.changeLocation);


    // Intervention Report API
    app.post('/api/v1/interventions', auth.verifyUserToken, validateInterventionReport, InterventionController.createIntervention);
    app.get('/api/v1/interventions', auth.verifyUserToken, InterventionController.getAllInterventions);
    app.get('/api/v1/interventions/:id', auth.verifyUserToken, InterventionController.getSingleIntervention);
    app.patch('/api/v1/interventions/:id/comment', auth.verifyUserToken, validateInterventionReport, InterventionController.editIntervention);
    app.delete('/api/v1/interventions/:id', auth.verifyUserToken, InterventionController.deleteIntervention);
    app.patch('/api/v1/interventions/:id/location', auth.verifyUserToken, validateInterventionReport, InterventionController.changeLocation);








       
}


export default EntryRoute;





