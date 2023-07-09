export const loginFailed_Get=async(req:any,res:any)=>{
    
        console.log(req.user)
        res.status(401).json({
          success: false,
          message: "failure",
        });
      
        
    }