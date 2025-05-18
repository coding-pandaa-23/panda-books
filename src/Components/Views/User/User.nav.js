import { useEffect, useState } from "react";
import Auth from "../../Utils/Auth.firebase";
import Notifier from "../../Utils/Notifier";
import RegisterView from "./Register.view";
import LoadingPage from "../../Widgets/Loading.page";
import AdminChecker from "../../Widgets/AdminChecker.wid";
import DB from "../../Database/Database.db";


const UserNav = ({
    isLoading = false,
    hideTopBar = false,
    view = 'home',
    onUserStateChanged = (()=>{}),
    children,
}) => {


    const auth = new Auth();
    const notifier = new Notifier();
    const [user, setUser] = useState('');

    useEffect(()=>{
        auth.onAuthStateChange((fbUser)=>{
            onUserStateChanged(fbUser);
            setUser(fbUser);

            if(fbUser){
                new DB().User.initialize();
            }
        })

        // eslint-disable-next-line
    }, []);

    
    function signOut(){
        notifier.showConfirmDialog({
            title: 'Sign Out!',
            message: 'Are you sure that you want to sign out?',
            confirmText: 'sign out',
            confirmColor: 'danger',
            onConfirm: ()=>{
                auth.logout();
            }
        })
    }

    return ( <>
        
        {!hideTopBar && <nav className="navbar navbar-expand-lg bg-body-tertiary mb-2">
            <div className="container-fluid px-lg-5 px-md-3">
                <a className="navbar-brand fw-bold text-secondary" href="/">
                    {view !== 'admin' && <i className="fa-solid fa-book-open fa-xl me-2"></i>}
                    <span>
                        {view !== 'admin' && 'VBOOKS'}
                        {view === 'admin' && 'ADMIN'}
                    </span>
                </a>

                <div className="">
                    {user && <ul className="nav ms-auto">
                        <li className="nav-item">
                            <a className={`nav-link link-secondary custom ${view === 'home' && 'active'}`} aria-current="page" href="/">
                                Home
                            </a>
                        </li>
                        
                        <AdminChecker>
                            <li className="nav-item">
                                <a className={`nav-link link-secondary custom ${view === 'admin' && 'active'}`} aria-current="page" href="/admin">
                                    Admin
                                </a>
                            </li>
                        </AdminChecker>

                        <li className="nav-item">
                            {/* eslint-disable-next-line */}
                            <a className="nav-link link-danger custom" aria-current="page" href="#" onClick={signOut}>
                                Logout
                            </a>
                        </li>
                        
                    </ul>}
                </div>
            </div>
        </nav>}

        <LoadingPage isLoading={isLoading || user === ''} />

        {!isLoading && user && children}

        {!isLoading && user !== '' && !user && <RegisterView/>}                   

    </> );
}
 
export default UserNav;