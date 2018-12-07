
export default (req, res, next) => {
    
        let check = true;
       //https://stackoverflow.com/questions/3518504/regular-expression-for-matching-latitude-longitude-coordinates
        const locationFilter= /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/
        const values = req.body;
        const required = ['type', 'location', 'title', 'comment'];
        let errors = {};

        for (let i = 0; i < required.length; i += 1) {
            if (!values[required[i]]) { check = false; errors[required[i]] = `${required[i]} is required`; }
        }
      if(values.type && !values.type.replace(/\s/g, '').length) {
          errors.type = 'type of report can not be blank'; check = false;
      }
      if(values.type && values.type !== 'red-flag' ){
          errors.type = "report should be a red-flag"; check=false;
      }
     if(values.location && !values.location.replace(/\s/g, '').length) {
        errors.location = 'Report location can not be blank'; check = false;
     }
     if(values.location && !locationFilter.test(String(values.location))){
        errors.location = 'Report location does not follow the long, lat format'; check = false;
     }
     if(values.title && !values.title.replace(/\s/g, '').length) {
        errors.title = 'Title can not be blank'; check = false;
     }
     if(values.title && (values.title).length < 4) {
        errors.title = 'Title should be less than four words'; check = false;
     }
     if(values.comment && !values.comment.replace(/\s/g, '').length) {
        errors.comment = 'Report comment can not be blank'; check = false;
     }
   
      if (check === false) { res.status(400).json({ status: 400, error: errors }); }
     else {
          req.body.type = req.body.type.trim(); 
          req.body.location = req.body.location.trim();
          req.body.comment = req.body.comment.trim();

          
            next();
        }
  };
  
 