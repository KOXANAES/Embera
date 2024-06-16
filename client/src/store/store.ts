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

}