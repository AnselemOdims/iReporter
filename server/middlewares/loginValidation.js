
export default (req, res, next) => {
    
    let check = true;
   
    const emailFilter = /^([a-zA-Z0-9_\s.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
   
  
    if (req.body.email) req.body.email = req.body.email.trim();
  
    const values = req.body;
    const required = [
      'email', 'password'
      ];
    const errors = {};
    
    for (let i = 0; i < required.length; i += 1) {
      if (!values[required[i]]) {
        check = false;
        errors[required[i]] = `${required[i]} is required`;
      }
    }
      
    if (
      values.email
      && (!values.email.replace(/\s/g, '').length
        || !emailFilter.test(String(values.email).toLowerCase()))
    ) {
      errors.email = 'Email can not be blank or not a valid email format';
      check = false;
    }
    
    if (
      values.password
      && !values.password.replace(/\s/g, '').length
       )
     {
      errors.password = 'Password can not be blank or does not follow the  format';
      check = false;
    }
  
    if (check === false) {
      res.status(400).json({ status: false, error: errors });
    } else {
      req.body.email = req.body.email;
      req.body.password = req.body.password;
      
      next();
    }
  };
  