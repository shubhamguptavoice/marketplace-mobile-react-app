var nodemailer=require('nodemailer')
function sendMail(name:any,email:any){
    var transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'waseemahmed116@gmail.com',
            pass:'aucznmpkooobgqze'
        }
    })
    var mailoption={
        from:'waseemahmed116@gmail.com',
        to:`${email}`,
        subject:'text mail  from waseem',
        text:`hello ${name} how r u,can u dance`
    }
    transporter.sendMail(mailoption,(errr:any,res:any)=>{
        if(errr){
            console.log("hh",errr)
        }else{
            console.log('mail sent')
        }
    })
}
export default sendMail