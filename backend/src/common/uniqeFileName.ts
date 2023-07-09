const { v4: uuidv4 } = require('uuid');
export const uniqeNameOfimage=(orgName:any)=>{
    return uuidv4() + '.' + orgName.split('.').pop()
  }