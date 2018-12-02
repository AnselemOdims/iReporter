
import auth from '../middlewares/auth';
import { users } from './UserController'
import moment from 'moment';


export const redFlagReports = [];
              

class RedflagController {

    createRedFlag(req, res) {
        
        let userId = req.decoded.id
        let reportId = redFlagReports.length + 1;
  const reports = {
        id : reportId,
        createdOn : moment(new Date()),
        createdBy : userId, // represents the user who created this record
        type : req.body.type, 
        location: req.body.location,
        status : "draft", // [draft, under investigation, resolved, rejected]
        comment: req.body.comment
    
    }
    // const token = auth.authenticate(user)
    const response = {
            "status" : 201,
            "data" : [{
                "id" : reportId , // red flag record primary key
                "message" : "Created new red-flag record"
                    }
            ]
            
        };
       redFlagReports.push(reports)
    
        res.status(201).json(response)
    }


    getAllRedFlags(req, res){
        let userId = req.decoded.id
        if(!userId){  
            res.status(404).json({ status: 404, error: "Not found" })
            }

        else{res.status(200).send({ status: 200, data: [{redFlagReports}]})}  
        
    }

    getSingleRedFlag(req, res){

        const redFlagReport = redFlagReports.find(report => report.id === parseInt(req.params.id))

        if(!redFlagReport){
            res.status(404).json({ status: 404, error: "Not found" }) 
            return; 
        }
        
        res.status(200).send({ status: 200, data: [{redFlagReport}]})
    }

    editRedFlag(req, res){
    
        const redFlagReport = redFlagReports.find(report => report.id === parseInt(req.params.id));
        if(!redFlagReport){
            res.status(404).json({ status: 404, error: "Not found" }) 
            return;
        }
        let reportId = redFlagReport.id;
        redFlagReport.comment = req.body.comment;

        res.status(200).send({ status: 200, data: [{ id: reportId, message:'Updated red-flag record’s comment', redFlagReport}]})
    }

    deleteRedFlag(req, res){
        const redFlagReport = redFlagReports.find(report => report.id === parseInt(req.params.id));
        if(!redFlagReport){
            res.status(404).json({ status: 404, error: "Not found" })
            return; 
            }
        let reportId = redFlagReport.id;
        const reportIndex = redFlagReports.indexOf(redFlagReport);
        redFlagReports.splice(reportIndex, 1)

        res.status(200).send({ status: 200, data: [{ id: reportId, message:'red-flag record has been deleted', redFlagReports}]})
    }

    changeLocation(req, res){
        const redFlagReport = redFlagReports.find(report => report.id === parseInt(req.params.id));
        if(!redFlagReport){
            res.status(404).json({ status: 404, error: "Not found" })
            return; 
            }
            let reportId = redFlagReport.id;
            redFlagReport.location = req.body.location;
            res.status(200).send({ status: 200, data: [{ id: reportId, message:'Updated red-flag record’s location', redFlagReport}]})
    }


}

export default new RedflagController();