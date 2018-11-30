
import auth from '../middlewares/auth';
import { users } from './UserController'
import moment from 'moment';


const redFlagReports = [];

// const interventionReports = [];
              

class ReportController {

    createRedFlag(req, res) {
        // const user = users.find(use => use.id === req.decoded.id)
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
            res.status(404).json({ status: 404, error: "Report Not found" })
            }

        else{res.status(200).send({ status: 200, data: [{redFlagReports}]})}  
        
    }

   


}

export default new ReportController();