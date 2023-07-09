var { User } = require("../../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRT_KEY = "USERAPIKEY";
export const Login_Get = (req: any, res: any) => {
  res.render("login",{error:''});
};
export const gmail_login_Post = async (req: any, res: any) => {
    console.log("ll1", req.body);
  
    // console.log("ll1", req.body);

    //var name = req.body.name;
    var email = req.body.email;
    var password = req.body?.password;
    //console.log(password)
    var user = await User.find({ email: email });

    console.log("99", !user[0],!user,user);
    if (!user) {
        console.log("invalid credentials");
      req.session.error = "Invalid Credentials";
      res.json({"status": "401",err:"invalid credentials"})
    }else{
    console.log(user[0].password)
    const matchPassword = await bcrypt.compare(password, user[0].password);
    console.log("g,", matchPassword);
    if (!matchPassword) {
      
      res.json({"status": "400",err:" wrong password invalid "})
    }else{

        console.log("..>>",user[0]._id)
    const maxAge = 3 * 24 * 60 * 60;
    const token = jwt.sign({id: user[0]._id }, SECRT_KEY,{
        expiresIn: maxAge
      });
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      //console.log("====",res.locals.user)
     // res.setHeader('Authorization', token).json({"status": "404",err:" token expired "})
   res.json({ "status":'201',user: user, token: token });
  
    }
}
    
    //res.render('home')


   
};