import { useEffect, useState } from "react";
import Auth from "../../Utils/Auth.firebase";
import AdminRegisterView from "./AdminRegister.view";
import Notifier from "../../Utils/Notifier";

const AdminNav = ({children, view = 'books', onClick = ((view)=>{})}) => {

    let auth = new Auth();
    let [user, setUser] = useState('');
    let notifier = new Notifier()

    useEffect(()=>{
        auth.onAuthStateChange((user)=>{
            setUser(user);
        })
    }, 
    // eslint-disable-next-line
    [])

    function signOut(){
        notifier.showConfirmDialog({
            title: 'Sign Out',
            message: 'Do you want to sign out?',
            confirmText: 'sign out',
            confirmColor: 'danger',
            onConfirm: ()=>{
                auth.logout();
            }
        })
    }

    return ( <>
        {user && <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                {/* eslint-disable-next-line */}
                <a className="navbar-brand" href="/admin">Panda Books <span className="fs-sm text-secondary">ADMIN</span></a>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a href="/" className='nav-link mx-2' aria-current="page">
                                <i className="fa-solid fa-house fa-xl"></i>
                            </a>
                        </li>
                        <li className="nav-item">
                            {/* eslint-disable-next-line */}
                            <a 
                                onClick={()=>onClick('books')}
                                className={`nav-link pointer mx-2 ${view === 'books' && 'active'}`} 
                                aria-current="page"
                                 ><i className="fa-solid fa-book fa-xl"></i></a>
                        </li>
                        <li className="nav-item">
                            {/* eslint-disable-next-line */}
                            <a 
                                onClick={()=>onClick('categories')}
                                className={`nav-link pointer mx-2 ${view === 'categories' && 'active'}`}
                                ><i className="fa-solid fa-list fa-xl"></i></a>
                        </li>
                        <li className="nav-item">
                            {/* eslint-disable-next-line */}
                            <a 
                                onClick={signOut}
                                className='nav-link pointer mx-2 text-danger'
                                ><i class="fa-solid fa-right-from-bracket fa-xl"></i></a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>}

        {user && children}
        
        {!user && <AdminRegisterView />}
    </> );
}
 
export default AdminNav;