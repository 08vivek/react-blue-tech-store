import UpdateCart from "./UpdateCart";
const axios = require('axios');
async function LogoutUser({cart,token}) {
  try{
    const options = {headers : {'Authorization' : `Bearer ${token}`}};
    await UpdateCart({cart,token});
    await axios.post('/users/logout',{},options)
  }catch(e){
    console.log(e);
  };
  } 

 export default LogoutUser;
   