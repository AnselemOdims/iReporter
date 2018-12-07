export default (req, res, next) => {
    let check = true;

     //https://stackoverflow.com/questions/3518504/regular-expression-for-matching-latitude-longitude-coordinates
     const locationFilter= /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/
     const values = req.body;
     const required = ["location"];
     let errors = {}
    
     if(required.length < 1){
        errors.location = 'Empty value passed'; check = false;
    }

        if (!values[required[0]]) { check = false; errors[required[0]] = `${required[0]} is required`; }
        
        if(values.location && !values.location.replace(/\s/g, '').length) {
            errors.location = 'Report location can not be blank'; check = false;
         }
         if(values.location && !locationFilter.test(String(values.location))){
            errors.location = 'Report location does not follow the long, lat format'; check = false;
         }
         
         if (check === false) { res.status(400).json({ status: 400, error: errors }); }
         else {
             
              req.body.location = req.body.location.trim();

              next();
            }
        }