import { CLIENT_URL } from "../../../config/client.config";

export const logout_Get=async(req:any,res:any)=>{
        console.log("====1like")      
        req.logout();
        res.redirect(CLIENT_URL);
        
    }