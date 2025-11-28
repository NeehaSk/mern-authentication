import axios from 'axios'
axios.defaults.withCredentials=true
const API=axios.create({
    baseURL:`${import.meta.env.VITE_API_URL}/api`,
    withCredentials:true
})
//attach the token to every req
API.interceptors.request.use((req)=>{                   // added a request interceptor, which automatically runs before every API call. Inside the

    const token=localStorage.getItem("token")            //login lo set chesam ekada token get chestunammm
    if(token){ 
        req.headers.Authorization=`Bearer ${token}`      // authmiddleware  ki pass cheyadaniki 
    }                                                   //url hide cheyadaniki bearer use chestammmm 
    return req
})
  
export default API                                 //“Interceptor automatically adds the token to every API request, so the user stays logged in and protected routes work.”