
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
                "id" : reportId , //  record primary key
                "message" : "Created new intervention record"
                    }
            ]
            
        };
       interventionReports.push(reports)
    
        res.status(201).json(response)
    }

    getAllInterventions(req, res){
        let userId = req.decoded.id
        if(!userId){  
            res.status(404).json({ status: 404, error: "Report Not found" })
            }

        else{res.status(200).send({ status: 200, data: [{interventionReports}]})}  
        
    }

    getSingleIntervention(req, res){

        const interventionReport = interventionReports.find(report => report.id === parseInt(req.params.id))

        if(!interventionReport){
            res.status(404).json({ status: 404, error: "Report Not found" }) 
            return; 
        }

        res.status(200).send({ status: 200, data: [{interventionReport}]})
    }

    editIntervention(req, res){
    
        const interventionReport = interventionReports.find(report => report.id === parseInt(req.params.id));
        if(!interventionReport){
            res.status(404).json({ status: 404, error: "Report Not found" }) 
            return;
        }
        interventionReport.type = req.body.type;
        interventionReport.comment = req.body.comment;

        res.status(200).send({ status: 200, data: [{ message:'Edit Successful', interventionReport}]})
    }

}

export default new InterventionController();