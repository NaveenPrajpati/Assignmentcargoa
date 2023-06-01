import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const BaseUrl=`http://localhost:4000`;
//Request interceptors for API calls
axios.interceptors.request.use(
  config => {
    if(localStorage.getItem('userData'))
    config.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('userData')).token}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const token=()=>{
  
  if(localStorage.getItem('userData'))
  return JSON.parse(localStorage.getItem('userData')).token

 
}
// const config={
//   headers:{
//     Authorization:`${"Bearer "+ token()}`
//   }
// }



  export const getTransporter =()=>{
        return axios.get(BaseUrl+'/transporter');
    }
  export const getAllMessages =()=>{
        return axios.get(BaseUrl+`/message`);
    }
  export const updataMessage =(id,message)=>{
        return axios.put(BaseUrl+`/:${id}`,message);
    }



    
   
