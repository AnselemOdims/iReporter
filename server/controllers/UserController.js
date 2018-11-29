import bcrypt from 'bcrypt';
// import moment from 'moment'
import auth from '../middlewares/auth';

const users = [

];

class UserController {

  createUser(req, res) {
    const usersmail = users.find(use => use.email === req.body.email);
    const usersname = users.find(c => c.username === req.body.username);
    // console.log(use)
    if(usersmail) {
      res.status(409).json({ status: 409, error: "User already registered" });
      return;
     }
    else if(usersname) {
      res.status(409).json({ status: 409, error: "Username already used" });
      return;
    }
    let salt = bcrypt.genSaltSync(10)
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    let userId = users.length + 1
       const user = {
          id: userId,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          othernames: req.body.othernames,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          username: req.body.username,
          password: req.body.password,
          confirmpassword: req.body.password,
          registered: (new Date()),
          isAdmin: Boolean
        };
    const token = auth.authenticate(user);
    console.log('token',token);
    const response = {
      status : 201,
      data : [{
        id : userId , 
        email: user.email,
        username: user.username,// red flag record primary key
        message : "Created new account"
           }],
      token
        
      };

    users.push(user);

    // console.log(user)
    res.status(201).send(response);
  }


  loginUser(req, res) {
    let user = users.find(use => use.email === req.body.email);
    if (!user) {
      res.json({ status: 400, error: "Invalid Email or Password" });
      return;
  }
   let userpw = user.password;
   console.log(userpw);

    const pwcheck = bcrypt.compareSync(req.body.password, userpw);
    if (!pwcheck) {
      res.json({ status: 400, error: "Invalid Email or Password" });
      return;
    }
     else {const token = auth.authenticate(user);
        delete user.password;
        delete user.confirmpassword;
        console.log(token)
        return res.status(201).send({ status: 201, data: [{ message:'Login Successful', user, token}] });
    
            }
  
}

}

    console.log(user)
    res.status(201).send(response);
  }






export default new UserController();
