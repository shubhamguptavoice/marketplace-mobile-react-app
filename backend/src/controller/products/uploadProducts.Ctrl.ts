import { UploadedFile } from "express-fileupload"
import { uniqeNameOfimage } from "../../common/uniqeFileName"
const { SellerUploadProducts } = require('../../models')
const path = require('path')

const mypath = path.join(__dirname, '../../../src/public')
export const uploadProducts_Post = async (req: any, res: any) => {
  products_uploads(req, res)
}
export const uploadProducts_Get = async (req: any, res: any) => {
  var data = await SellerUploadProducts.find({})
  res.send(data);
}
const products_uploads = (req: any, res: any) => {
  let images
  let uploadPathOfImageWithName
  var seller_id = req.body.seller_id
  var name = req.body.name;
  var type = req.body.type;
  var category = req.body.category;
  var discription = req.body.discription;
  var from_date = req.body.from_date;
  var to_date = req.body.to_date;
  var base_uri = 'http://localhost:8001/images/';
  let price=req.body.price
  var img_name
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  var multipleImages:any[]=Object.values(req.files)
  if(multipleImages.length==1 && !(multipleImages[0].length>0)){

    images =multipleImages[0]
    let imgName =uniqeNameOfimage(images.name)
    uploadPathOfImageWithName = mypath + '/images/' +imgName;
    images.mv(uploadPathOfImageWithName, function (err:any) {
      if (err) {
        console.log(err)
      }
    });
    img_name = imgName;
    var isproductSaved=saveProductDetailsService(seller_id, name, type, category, discription,
      from_date, to_date, base_uri, img_name,price
    )
    console.log('isproductSaved',isproductSaved)
    if(isproductSaved){
      res.sendStatus(200)
    }else{
      console.log('product did not got saved')
      res.send('product did not got saved try again')
    }
  }
  if(multipleImages[0].length>1){
    var allimagesNames:any[]=[]
    
    multipleImages[0].map((images:any)=>{
       let imgName =uniqeNameOfimage(images.name)
       allimagesNames.push(imgName) 
       uploadPathOfImageWithName = mypath + '/images/' +imgName;
       images.mv(uploadPathOfImageWithName, function (err:any) {
         if (err) {
           console.log(err)
         }
       });
    })
    img_name = allimagesNames;
    var isproductSaved=saveProductDetailsService(seller_id, name, type, category, discription,
      from_date, to_date, base_uri, img_name,price
    )
    if(isproductSaved){
      res.sendStatus(200)
    }else{
      console.log('product did not got saved')
      res.send('product did not got saved try again')
    }
  }
 
 
   
 
}
const saveProductDetailsService = (
  seller_id: any, name: any, type: any, category: any, discription: any,
  from_date: any, to_date: any, base_uri: any, img_name: any,price:any
) => {
  try {
    var moviedata = new SellerUploadProducts(
      {
        seller_id: seller_id,
        name: name,
        type: type,
        category: category,
        discription: discription,
        from_date: from_date,
        to_date: to_date,
        base_uri: 'http://localhost:8001/images/',
        img_name: img_name,
        price:price
      })
    moviedata.save()
    return true
  } catch (err) {
    console.log(err)
    return false
  }

}

