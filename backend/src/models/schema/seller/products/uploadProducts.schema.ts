require('../../../../../config/db.config')
var mongoose=require('mongoose')
var {Schema}=mongoose

var uploadProductsStructure=new Schema({
    seller_id:String,
    name:String,
    type:String,
    category:String,
    discription:String,
    from_date:String,
    to_date:String,
    ratins:String,
    base_uri:String,
    img_name:Array,
    price:String
   
},{
    timestamps: true
  })

module.exports=mongoose.model('sellersUploadedProducts',uploadProductsStructure)




