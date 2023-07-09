import { UploadedFile } from "express-fileupload"
const { SellerUploadProducts } = require('../../models')
const path=require('path')

    export const findSingleProductById_Get=async(req:any,res:any)=>{
    let id=req.query.id
      console.log('ll',req.query)
     var data = await SellerUploadProducts.find({_id:id})
     res.send(data);           
        }
  