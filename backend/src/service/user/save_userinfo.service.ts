var { User } = require("../../models");
export const saveUser=(data:any)=>{
    const newUser = { fname: data.fname};
    var userdta = new User(newUser);
    userdta.save();
}