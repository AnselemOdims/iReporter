
export default (req, res, next) => {
    
  let check = true;
 
  const emailFilter = /^([a-zA-Z0-9_\s.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
  const passwordFilter = /^[a-zA-Z0-9]{3,30}$/;
  const phoneFilter = /^\d{3}-\d{3}-\d{5}$/;

  if (req.body.email) req.body.email = req.body.email.trim();

  const values = req.body;
  const required = [
    'firstname', 'lastname', 'othernames', 
    'email', 'phoneNumber','username', 'password',
    'confirmpassword' ];
  const errors = {};
  
  for (let i = 0; i < required.length; i += 1) {
    if (!values[required[i]]) {
      check = false;
      errors[required[i]] = `${required[i]} is required`;
    }
  }
  if (values.firstname && !values.firstname.replace(/\s/g, '').length) {
    errors.firstname = 'firstname can not be blank';
    check = false;
  }
  if ((values.firstname).length < 2) {
    errors.firstname = 'Firstname length must be at least 2 characters long';
    check = false;
  }
  if (values.lastname && !values.lastname.replace(/\s/g, '').length) {
    errors.lastname = 'lastname can not be blank';
    check = false;
  }
  if ((values.lastname).length < 2) {
    errors.lastname = 'Lastname length must be at least 2 characters long';
    check = false;
  }
  if (values.othernames && !values.othernames.replace(/\s/g, '').length) {
    errors.othernames = 'othernames can not be blank';
    check = false;
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
    values.phoneNumber
    && (!values.phoneNumber.replace(/\s/g, '').length || !phoneFilter.test(String(values.phoneNumber)))
  ) {
    errors.password = 'Phonenumber can not be blank or does not follow the xxx-xxx-xxxxx format';
    check = false;
  }
  if (values.username && !values.username.replace(/\s/g, '').length) {
    errors.username = 'username can not be blank';
    check = false;
  }
  if (
    values.password
    && (!values.password.replace(/\s/g, '').length
      || !passwordFilter.test(String(values.password))))
   {
    errors.password = 'Password can not be blank or does not follow the  format';
    check = false;
  }
  if (
    values.confirmpassword !== values.password
  ) {
    errors.confirmpassword = 'Passwords dont match';
    check = false;
  }
 

  if (check === false) {
    res.status(400).json({ status: false, error: errors });
  } else {
    req.body.name = req.body.name;
    req.body.password = req.body.password;
    req.body.email = req.body.email;
    next();
  }
};
