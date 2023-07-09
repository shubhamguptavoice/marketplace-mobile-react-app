var mongoose=require('mongoose')
export var url2="mongodb://127.0.0.1:27017/aisha"
mongoose.connect(url2,(err:any)=>{
    if(err){
       console.log(err)
    }else{
        console.log('db connection done')
       }
    
})