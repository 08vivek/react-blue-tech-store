const axios = require('axios');

async function LogoutUser({token}) {
    const options = {headers : {'Authorization' : `Bearer ${token}`}};
    const response = await axios.post('http://localhost:5000/users/logout',{},options)
      .catch(error => console.log(error));
    console.log(response);
  } 

 export default LogoutUser;
   