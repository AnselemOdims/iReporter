
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


//     getAllRedFlags(req, res){

//         if(!redFlagReports){  
//             res.status(404).json({ status: 404, error: "Report Not found" })
//             }

//         else{res.status(200).send({ status: 200, data: [{redFlagReports}]})}  
        
//     }

//     getSpecificRedFlag(req, res){

//         const redFlagReport = redFlagReports.find(report => report.id === parseInt(req.params.id))

//         if(!redFlagReport){
//             res.status(404).json({ status: 404, error: "Report Not found" }) 
//             return; 
//         }

//         res.status(200).send({ status: 200, data: [{redFlagReport}]})
//     }

//     editRedFlag(req, res){

//         const redFlagReport = redFlagReports.find(report => report.id === parseInt(req.params.id));
//         if(!redFlagReport){
//             res.status(404).json({ status: 404, error: "Report Not found" }) 
//             return;
//         }
//         redFlagReport.type = req.body.type;
//         redFlagReport.comment = req.body.comment;

//         res.status(200).send({ status: 200, data: [{ message:'Edit Successful', redFlagReport}]})
//     }

//     deleteRedFlag(req, res){
//         const redFlagReport = redFlagReports.find(report => report.id === parseInt(req.params.id));
//         if(!redFlagReport){
//             res.status(404).json({ status: 404, error: "Report Not found" })
//             return; 
//          }
        
//         const reportIndex = redFlagReports.indexOf(redFlagReport);
//         redFlagReports.splice(reportIndex, 1)

//         res.status(200).send({ status: 200, data: [{ message:'Delete Successful', redFlagReports}]})
//     }

//     createIntervention(req, res) {
//         let reportId = interventionReports.length + 1;
//   const reports = {
//         id : reportId,
//         createdOn : moment(new Date()),
//         // createdBy : userId, // represents the user who created this record
//         type : req.body.type, // [red-flag, intervention]
//         location: req.body.location, // Lat Long coordinates
//         status : "draft", // [draft, under investigation, resolved, rejected]
//         // Images : [Image, Image],
//         // Videos : [Image, Image],
//         comment: req.body.comment
    
//     }

//     const response = {

//             "status" : 201,
//             "data" : [{
//                 "id" : reportId ,
//                 "message" : "Created new intervention record"
//                     }
//             ]

//         };
//        interventionReports.push(reports)
//     //    console.log(interventionReports)
//         res.status(201).json(response)
//     }


//     getAllIntervention(req, res){

//         if(!interventionReports){  
//             res.status(404).json({ status: 404, error: "Report Not found" })
//             }

//         else{res.status(200).send({ status: 200, data: [{interventionReports}]})}  
        
//     }

//     getSpecificIntervention(req, res){

//         const interventionReport = interventionReports.find(report => report.id === parseInt(req.params.id))

//         if(!interventionReport){
//             res.status(404).json({ status: 404, error: "Report Not found" }) 
//             return; 
//         }

//         res.status(200).send({ status: 200, data: [{interventionReport}]})
//     }

//     editIntervention(req, res){

//         const interventionReport = interventionReports.find(report => report.id === parseInt(req.params.id));
//         if(!interventionReport){
//             res.status(404).json({ status: 404, error: "Report Not found" }) 
//             return;
//         }
//         interventionReport.type = req.body.type;
//         interventionReport.comment = req.body.comment;

//         res.status(200).send({ status: 200, data: [{ message:'Edit Successful', interventionReport}]})
//     }

//     deleteIntervention(req, res){
//         const interventionReport = interventionReports.find(report => report.id === parseInt(req.params.id));
//         if(!interventionReport){
//             res.status(404).json({ status: 404, error: "Report Not found" })
//             return; 
//          }
        
//         const reportIndex = interventionReports.indexOf(interventionReport);
//         interventionReports.splice(reportIndex, 1)

//         res.status(200).send({ status: 200, data: [{ message:'Delete Successful', interventionReports}]})
//     }


}

export default new ReportController();