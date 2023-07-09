var {RatingProducts}=require('../../../models')

export const ratingProducts_Get=async(req:any,res:any)=>{
    var data=await  RatingProducts.find({})
    console.log(req.user)
    res.send(data)
  
    
}
export const ratingProducts_Post=async(req:any,res:any)=>{
    
    console.log("ll",req.body.seller_id)
    var ratingdata=new RatingProducts(
        {
    user_id:req.body.user_id,
    user_name:req.body.user_name,
    product_id:req.body.product_id,
    name:req.body.name,
    review:req.body.review,
    ratings:req.body.ratings,
    seller_id:req.body.seller_id
        })
        ratingdata.save()
    res.send('hello')
  
    
}