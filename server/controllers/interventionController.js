
import auth from '../middlewares/auth';
import moment from 'moment';

const interventionReports = [];

class InterventionController {

    createIntervention(req, res) {
        
        let userId = req.decoded.id
        let reportId = interventionReports.length + 1;
        const reports = {
            id : reportId,
            createdOn : moment(new Date()),
            createdBy : userId, // represents the user who created this record
            type : req.body.type, 
            location: req.body.location,
            status : "draft", // [draft, under investigation, resolved, rejected]
            comment: req.body.comment
    
    }

    const response = {
            "status" : 201,
            "data" : [{
                "id" : reportId , // red flag record primary key
                "message" : "Created new intervention record"
                    }
            ]
            
        };
       interventionReports.push(reports)
    
        res.status(201).json(response)
    }

}

export default new InterventionController();