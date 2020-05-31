const axios = require('axios');

async function UpdateCart({cart,token}) {
  const options = {headers : {'Authorization' : `Bearer ${token}`}};
  try{
    const response = await axios.patch('/users/me', {cart},options);
    return response;
  }catch(e){
    return {};
  }
}
export default UpdateCart;
