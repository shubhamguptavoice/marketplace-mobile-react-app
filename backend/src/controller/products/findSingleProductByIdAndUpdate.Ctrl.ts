import { UploadedFile } from "express-fileupload"
import { uniqeNameOfimage } from "../../common/uniqeFileName"
const { SellerUploadProducts } = require('../../models')
const path=require('path')
const mypath = path.join(__dirname, '../../../src/public')


    export const findSingleProductByIdAndUpdate_Put=async(req:any,res:any)=>{
    let id=req.query.id
    let name=req.query.name
   let ratins=req.query.ratins
  var type = req.query.type;
  var category = req.query.category;
  var discription = req.query.discription;
  var from_date = req.query.from_date;
  var to_date = req.query.to_date;
  var img_name
  var base_uri = 'http://localhost:8001/images/';
      var multipleImages:any[]=Object.values(req.files)
      img_name=multipleImageUploader(multipleImages)
      try{
       singleProductUpdateService(res,
        id,
        type,
        name,
        category,
        discription,
        from_date,
        to_date,img_name,base_uri,ratins)
      }catch(error){
      console.log(error)
      res.sendStatus(400)}
   
    }
  const singleProductUpdateService=async(res:any,id:any,
    type:any,
    name:any,
    category:any,
    discription:any,
    from_date:any,
    to_date:any,
    img_name:any,
    base_uri:any,
    ratins:any
    )=>{
        var newVal={name:name,type:type,category:category,discription:discription,from_date:from_date,to_date:to_date,img_name:img_name,base_uri:base_uri,ratins:ratins}
    var updated=await SellerUploadProducts.findOneAndUpdate({_id:id},newVal)        
      
    if(JSON.stringify(updated)=='null'){
        res.send('no product in db by this ID')  
    }else{
        res.sendStatus(200)
    }
  }
      
  const multipleImageUploader=(multipleImages:any)=>{
    let uploadPathOfImageWithName
    var allimagesNames:any[]=[]
    multipleImages.map((images:any)=>{
       let imgName =uniqeNameOfimage(images.name)
       allimagesNames.push(imgName) 
       uploadPathOfImageWithName = mypath + '/images/' +imgName;
       images.mv(uploadPathOfImageWithName, function (err:any) {
         if (err) {
           console.log(err)
         }
       });
    })
return allimagesNames
  }
       
     
     