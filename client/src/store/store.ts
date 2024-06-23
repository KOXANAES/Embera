import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import AuthService from "../service/AuthService";
import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { API_URL } from "../http";

export default class Store {
    
    user = {} as IUser
    isAuth = false
    isLoading = false
    constructor() { 
        makeAutoObservable(this)
    }

    setAuth(bool:boolean) { 
        this.isAuth = bool
    }

    setUser(user:IUser) { 
        this.user = user
    }

    setIsLoading(bool:boolean) { 
        this.isLoading = bool
    }

    async login(email:string,password:string) { 
        try { 
            const response = await AuthService.login(email, password)
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch(e) { 
            console.log(e)
        }
    }

    async registration(email:string,password:string,username:string) { 
        try { 
            const response = await AuthService.registration(email, password, username)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch(e) { 
            console.log(e)
        }
    }

    async logout() { 
        try { 
            const response = await AuthService.logout()
            console.log(response)
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({} as IUser)
        } catch(e) { 
            console.log(e)
        }
    }

    async checkAuth() { 
        this.setIsLoading(true)
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, {withCredentials:true})
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch(e) { 
            console.log(e)
        } finally { 
            this.setIsLoading(false)
        }
    }

    async calcTVPT1(e:any, params:any) {
        e.preventDefault()
        const response = await axios.post(`${API_URL}/calc/tvipg_1`, params , {headers:{'authorization': `Bearer ${localStorage.token}`}})
        const ansField = document.querySelector('.calc1_ans')
        ansField.innerHTML = response.data
        console.log(response.data   )
    }

    async sendTechMessage(useremail:string , message:string) { 
        const UserEmail = useremail
        console.log(UserEmail)
        const reqData = {
            UserEmail:UserEmail, 
            message:message
        }
        const response = await axios.post(`${API_URL}/tech/help`, reqData, {headers:{'authorization': `Bearer ${localStorage.token}`}})
        alert(response.data.message)
    }

    async activate(Email:string) {
        const email = { 
            email:Email
        }
        const response = await axios.post(`${API_URL}/auth/sendMail`, email , {headers:{'authorization': `Bearer ${localStorage.token}`}})
        alert(response.data)
    }
}