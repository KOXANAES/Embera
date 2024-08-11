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
            if(!email) { 
                alert(`Поле "email" является обязательным`)
                return
            }
            if(!password) { 
                alert(`Поле "password" является обязательным`)
                return
            }
            const response = await AuthService.login(email, password)
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch(e) { 
            console.log(e)
            alert('Неверный логин либо пароль!')
        }
    }

    async registration(email:string,password:string,username:string) { 
        try { 
            if(!email) { 
                alert(`Поле "email" является обязательным`)
                return
            }
            if(!password) { 
                alert(`Поле "password" является обязательным`)
                return
            }
            if(!username) { 
                alert(`Поле "username" является обязательным`)
                return
            }
            const response = await AuthService.registration(email, password, username)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch(e) { 
            // console.log(e)
            alert(e.response.data.message)
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