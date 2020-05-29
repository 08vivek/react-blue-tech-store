const axios = require('axios');

async function RegisterUser({email,password,username}) {
  try{
    const response = await axios.post('http://localhost:5000/users/signup', {username,email,password})
    return response;
  }catch(e){
    return {};
  }
  
}
export default RegisterUser;
