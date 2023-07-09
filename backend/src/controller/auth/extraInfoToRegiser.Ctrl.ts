import { CLIENT_URL } from "../../../config/client.config";
var {User}=require('../../models')
export const extraInfoToRegiser_Get=async(req:any,res:any)=>{
    
        console.log("====1like111",req.params.id)
        var conflic= await  User.find({ fb_id:req.params.id })
        //console.log("email already exits",conflic[0].DOB);
        if(conflic[0].DOB===undefined){
            res.redirect(`${CLIENT_URL}facebook/moreinfo/${req.params.id }`);
        }else{
            res.redirect(`${CLIENT_URL}dashboard`);
        }
        
    }
    export const extraInfoToRegiser_Post=async(req:any,res:any)=>{
    
        console.log("====post",req.body)
        console.log("====post",req.params)
        //console.log("====post",req.qurey.id)
         
         var likes=await  User.findOneAndUpdate({fb_id:req.params.id },
            {phonno:req.body.phonno,DOB:req.body.dob,email:req.body.email},
            {overwrite:false,new:true})
         // console.log(likes)
        
        // console.log("email already exits",conflic[0]);
       
            res.json({ "status": "200" });
        
        
       // res.redirect(`${CLIENT_URL}dashbord`);
    }