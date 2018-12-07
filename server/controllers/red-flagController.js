
import auth from '../middlewares/auth';
import { users } from './UserController'
import moment from 'moment';


export const redFlagReports = [];
              

class RedflagController {
     //Create a new red-flag constructor
    createRedFlag(req, res) {
        let userId = req.decoded.id
        let reportId = redFlagReports.length + 1;
  const reports = {
    id : reportId,//red-flag primary key
    createdOn : moment(new Date()),//returns current date
    createdBy : userId, // represents the user who created this record
    type : req.body.type, 
    location: req.body.location,
    status : "draft",//status of report, it can be draft, under investigation, resolved, rejected
    images: [],
    videos: [],
    title: req.body.title, 
    comment: req.body.comment
    }
   
    const response = {
            "status" : 201,
            "data" : [{
                "id" : reportId , // red flag record primary key
                "message" : "Created new red-flag record"//Success message
                    }
            ], 
            redFlagReports
            
        };
       redFlagReports.push(reports)
    
        res.status(201).json(response)
    }

   //constructor for get all red-flag records
    getAllRedFlags(req, res){
        let userId = req.decoded.id
        if(!userId){  
            res.status(404).json({ status: 404, error: "Not found" })
            }

        else{res.status(200).send({ status: 200, data: [{redFlagReports}]})}  
        
    }

    //constructor for get single red-flag record
    getSingleRedFlag(req, res){

        const redFlagReport = redFlagReports.find(report => report.id === Number(req.params.id))

        if(!redFlagReport){
            res.status(404).json({ status: 404, error: "Not found" }) 
            return; 
        }
        
        res.status(200).send({ status: 200, data: [{redFlagReport}]})
    }

    //constructor to edit red-flags by users
    editRedFlag(req, res){
    
        const redFlagReport = redFlagReports.find(report => report.id === Number(req.params.id));
        if(!redFlagReport){
            res.status(404).json({ status: 404, error: "Not found" }) 
            return;
        }
        let reportId = redFlagReport.id;
        redFlagReport.comment = req.body.comment;

        res.status(200).send({ status: 200, data: [{ id: reportId, message:'Updated red-flag record’s comment', redFlagReport}]})
    }

    //constructor to delete red-flag
    deleteRedFlag(req, res){
        const redFlagReport = redFlagReports.find(report => report.id === Number(req.params.id));
        if(!redFlagReport){
            res.status(404).json({ status: 404, error: "Not found" })
            return; 
            }
        let reportId = redFlagReport.id;
        const reportIndex = redFlagReports.indexOf(redFlagReport);
        redFlagReports.splice(reportIndex, 1)

        res.status(200).send({ status: 200, data: [{ id: reportId, message:'red-flag record has been deleted', redFlagReports}]})
    }

    //change the location of the report
    changeLocation(req, res){
        const redFlagReport = redFlagReports.find(report => report.id === Number(req.params.id));
        if(!redFlagReport){
            res.status(404).json({ status: 404, error: "Not found" })
            return; 
            }
            let reportId = redFlagReport.id;
            redFlagReport.location = req.body.location;
            let location = redFlagReport.location
            
                    res.status(200).send({ status: 200, data: [{ id: reportId, message:'Updated red-flag record’s location', location}]})
    }


}

export default new RedflagController();