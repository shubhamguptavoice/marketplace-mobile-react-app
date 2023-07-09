var {RatingProducts}=require('../../../models')
export const ratingSingleProducts_Get=async(req:any,res:any)=>{
     var data=await  RatingProducts.find({product_id:req.params.id})
    console.log(req.params)
    res.send(data)
  
    
}