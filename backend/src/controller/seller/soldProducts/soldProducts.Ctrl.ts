import { UploadedFile } from "express-fileupload"
const {RatingProducts}=require('../../../models')
const path=require('path')

    export const soldProducts_Get=async(req:any,res:any)=>{
      console.log('ll',req.params)
       var data=await  RatingProducts.find({seller_id:req.params.seller_id})    
            res.send(data);
            
        }
  