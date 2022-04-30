import axios from "axios";
import { defineStore } from "pinia";
import cookies from 'vue-cookies';
import {router} from '@/router'


export const useMainStore = defineStore('main',{
    state : () => {
        return{
        }
        
    },
    actions: {
        createUser(username, firstName, lastName, email, password, pictureUrl){
            axios.request({
                headers: {
                    "x-api-key" : process.env.VUE_APP_API_TOKEN
                },
                url:process.env.VUE_APP_API_URL+"client",
                method : "POST",
                data: {
                    username ,
                    firstName,
                    lastName,
                    email,
                    password,
                    pictureUrl
                }
                
            }).then((response)=>{
                cookies.set('sessionToken', response.data.token);
                console.log(cookies.get('sessionToken'));
                router.push('/profile');
            }).catch((error)=>{
                console.log(error.response.data);
                this.userRegisterAlert(error.response);
            })
        },
        userRegisterAlert(error){
            return (error)
        }
    }
})