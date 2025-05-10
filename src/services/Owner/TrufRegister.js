import axios from 'axios'
import { BaseUrl } from '../utiles'

export async function RegisterTruf(payload) {
    const url = BaseUrl+"/truf/register"
    // console.log(url)
    try{
        const response = await axios.post(url,{...payload})
        if(response.data.error){
            return{error:response.data.error}
        }
        if(response.status >= 200 && response.status<400 && response.data){
            return response.data
        }
    }catch(e){
        console.log(e)
        if(e?.response?.data?.error){
            throw e.response.data.error
        }
        if (e?.response?.data){
            throw e.response.data
        }
        throw e
    }
}