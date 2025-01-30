import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import '../css/navbar.css'

export const Navbar = () => {
    const history = useNavigate()
    const auth = useContext(AuthContext)
    const email = JSON.parse(localStorage.getItem('UserData'))
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history('/')
    }
    return (
    <nav>
        <div className="nav-wrapper">
            <a href="#" className="brand-logo">todo App</a>
            <ul id="nav-mobile">
                <li className='nav-email'>{email.userEmail}</li>
                <li><a href='/' className='nav-logout' onClick={logoutHandler}>Выйти</a></li>
            </ul>
        </div>
    </nav>
    )
}