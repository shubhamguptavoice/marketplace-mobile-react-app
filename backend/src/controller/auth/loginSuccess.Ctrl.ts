export const loginSuccess_Get=async(req:any,res:any)=>{
   // console.log("oooo",req.user)
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }else{
    console.log('NO USER')
  }

           
        
    }