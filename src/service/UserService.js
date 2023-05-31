import axios from "axios";

const BaseUrl='https://blog-backend-c06h.onrender.com/user';


 export const authUser=(user)=>{
        return axios.post(BaseUrl+"/auth",user);
    }
 export const registerUser=(user)=>{
        return axios.post(BaseUrl+"/register",user);
    }
 export const loginUser=(user)=>{
        return axios.post(BaseUrl+"/login",user);
    }
    export const resetPassword=(user)=>{
        return axios.post(BaseUrl+"/auth/reset",user);
    }
    export const createNewPassword=(user)=>{
        return axios.post(BaseUrl+"/auth/reset/new",user);
    }



