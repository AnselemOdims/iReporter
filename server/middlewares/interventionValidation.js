export default (req, res, next) => {
    
    let check = true;

    const values = req.body;
    const required = ['type', 'location', 'comment'];
    let errors = {};

    for (let i = 0; i < required.length; i += 1) {
        if (!values[required[i]]) { check = false; errors[required[i]] = `${required[i]} is required`; }
    }
  if(values.type && !values.type.replace(/\s/g, '').length) {
      errors.type = 'type of report can not be blank'; check = false;
  }
  if(values.type && values.type !== 'intervention' ){
      errors.type = "Report should be an intervention"; check=false;
  }
 if(values.location && !values.location.replace(/\s/g, '').length) {
    errors.location = 'Report location can not be blank'; check = false;
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
