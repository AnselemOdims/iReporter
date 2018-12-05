import { users } from './UserController'
import auth from '../middlewares/auth';
import moment from 'moment';

export const interventionReports = [];

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
            status : "draft",
            images: [],
            videos: [],
            title: req.body.title, 
            comment: req.body.comment
    
    }

    const response = {
            "status" : 201,
            "data" : [{
                "id" : reportId , //  record primary key
                "message" : "Created new intervention record"
                    }
            ],
            interventionReports
            
        };
       interventionReports.push(reports)
    
        res.status(201).json(response)
    }

    getAllInterventions(req, res){
        let userId = req.decoded.id
        if(!userId){  
            res.status(404).json({ status: 404, error: "Not found" })
            }

        else{res.status(200).send({ status: 200, data: [{interventionReports}]})}  
        
    }

    getSingleIntervention(req, res){

        const interventionReport = interventionReports.find(report => report.id === parseInt(req.params.id))

        if(!interventionReport){
            res.status(404).json({ status: 404, error: "Not found" }) 
            return; 
        }

        res.status(200).send({ status: 200, data: [{interventionReport}]})
    }

    editIntervention(req, res){
    
        const interventionReport = interventionReports.find(report => report.id === parseInt(req.params.id));
        if(!interventionReport){
            res.status(404).json({ status: 404, error: "Not found" }) 
            return;
        }
        let reportId = interventionReport.id;
        interventionReport.comment = req.body.comment;

        res.status(200).send({ status: 200, data: [{ id: reportId, message:'Updated intervention record’s comment', interventionReport}]})
        }

    deleteIntervention(req, res){
        const interventionReport = interventionReports.find(report => report.id === parseInt(req.params.id));
        if(!interventionReport){
            res.status(404).json({ status: 404, error: "Not found" })
            return; 
            }
        let reportId = interventionReport.id;
        const reportIndex = interventionReports.indexOf(interventionReport);
        interventionReports.splice(reportIndex, 1)

        res.status(200).send({ status: 200, data: [{ id: reportId, message:'intervention record has been deleted', interventionReports}]})
    }
    changeLocation(req, res){
        const interventionReport = interventionReports.find(report => report.id === parseInt(req.params.id));
        if(!interventionReport){
            res.status(404).json({ status: 404, error: "Not found" })
            return; 
            }
            let reportId = interventionReport.id;
            interventionReport.location = req.body.location;
            res.status(200).send({ status: 200, data: [{ id: reportId, message:'Updated intervention record’s location', interventionReport}]})
    }

}

export default new InterventionController();