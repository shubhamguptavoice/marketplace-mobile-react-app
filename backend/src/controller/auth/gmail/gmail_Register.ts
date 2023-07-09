import { TypedRequestBody } from "../../../common/interfaces/common.interface";
import  sendMail  from "../../../helper/mailer/sendmail";
import { Iregister_Post } from "./gmail.interface";
var { User } = require("../../../models");
import { Response } from "express";
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken')
const SECRT_KEY="USERAPIKEY"

export const gmail_Register_Post = async (
  req: TypedRequestBody<Iregister_Post>,
  res: Response
) => {
  var fname = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.email;
  var dob = req.body.dob;
  var phonno = req.body.phonno;
  var password = req.body.password;
  var role = req.body.role;
  var userlanguage = req.body.userlanguage
  
  
  console.log("ll", req.body)
//   if (!fname || !email || !password)
//     return res.render("register",{error:'Username ,emil and password are required.'});
      
  // check for duplicate usernames in the db
  var conflic= await  User.find({ email: email })
  console.log("email already exits",conflic!=0);
  if (conflic[0]) {
    console.log("email already exits");
    res.json({ "status": "409" });
}else{
      try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);
        //store the new user
        const newUser = { fname: fname,lname: lname, email: email,role:role,
             password: hashedPwd,DOB:dob,phonno:phonno,userlanguage:userlanguage };
        var userdta = new User(newUser);
        userdta.save();


        await sendMail(fname, email);
        
        const maxAge = 3 * 24 * 60 * 60;
        const token=jwt.sign({id:userdta._id},SECRT_KEY,{
          expiresIn: maxAge
        })
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.json({"status": "201",user:userdta,token:token})
         //res.render('login',{error:''});
        
      } catch (err: any) {
        res.json({ "status": "309","err":"user not registerd try again" });
        //res.render("register",{error:'user not registerd try again'});
      }
    }


};
