const axios = require('axios');

 async function LoginUser({email,password}) {
     try{
        const response = await axios.post('http://localhost:5000/users/login', {email,password})
        return response;
     }catch(e){
         return {}
     }
} 

export default LoginUser;
