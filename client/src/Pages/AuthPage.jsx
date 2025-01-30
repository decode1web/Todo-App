import { useContext, useEffect, useState } from "react"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"
import { AuthContext } from "../context/AuthContext"

export const AuthPage = () => {
    const authA = useContext(AuthContext)
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const [auth, setAuth] = useState(true)
    const [form, setForm] = useState({
        username: '', email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    },[error, message, clearError])

    const changeHandler = ev => {
        setForm({...form, [ev.target.name]: ev.target.value})
    }

    const changeAuth = () => {
        setAuth(!auth)
    } 

    const registerHandler = async () => {
        try{
            const data = await request('/api/auth/register', 'POST', {...form})
            alert(data.message)
        } catch (e) {return e}
    }

    const loginHandler = async () => {
        try{
            const data = await request('/api/auth/login', 'POST', {...form})
            authA.login(data.token, data.userId, data.userEmail)
        } catch (e) {return e}
    }


    return (
        <div className="container auth-container">
            <div className="auth-block">
                <h1>todo App</h1>
                <div className="card">
                    <p className="card-title">Авторизация</p>
                    <div className="card-input">
                        <ul>
                            {auth ? null : (<li><input type="text" onChange={changeHandler} name="username" placeholder="Введите имю..." /></li>)}
                            <li><input type="text" onChange={changeHandler} placeholder="Введите email..." name="email" /></li>
                            <li><input type="password" onChange={changeHandler} placeholder="Введите пароль..." name="password" /></li>
                        </ul>
                    </div>
                    <div className="card-btn">
                        {auth ? <button 
                                    disabled={loading}
                                    onClick={loginHandler}
                                >
                                    Войти
                                </button> : null}
                        {auth ? null : <button 
                                    onClick={registerHandler}
                                    disabled={loading}
                                >
                                    Регистрация
                                </button>}
                    </div>
                </div>
                <div className="sub-signin">Еще нет акаунта? <button className="change-btn-auth" onClick={changeAuth}>{auth ? 'Зарегистрироваться' : 'Войти'}</button></div>
            </div>
        </div>
    )
}