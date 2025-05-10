import { use, useEffect, useState } from "react";
import Auth from "../../Utils/Auth.firebase";
import Notifier from "../../Utils/Notifier";
import RegisterModal from "./Register.modal";
import DB from "../../Database/Database.db";

/**
 * @callback UserStateCallback
 * @param {import("firebase/auth").User} user
 */

/**
 * @param {Object} object 
 * @param {'home' | 'library' | 'community' | 'personal' | 'favorites' | 'continue-reading' } object.view
 * @param {UserStateCallback} object.onUserStateChange
 */

const UserNav = ({
    view = 'home',
    onUserStateChange,
    children,
}) => {

    const registerModalId = 'userNavRegisterModalId';

    const auth = new Auth();
    const db = new DB();
    const notifier = new Notifier();
    const [user, setUser] = useState();

    useEffect(()=>{
        auth.onAuthStateChange(async (fbUser)=>{
            setUser(fbUser);
            await db.User.initialize(fbUser);
            onUserStateChange && onUserStateChange(fbUser);
        })
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
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid px-lg-5 px-md-3">
                <a className="navbar-brand fw-bold text-secondary" href="/">
                <i className="fa-solid fa-book-open fa-xl me-2"></i>VBOOKS</a>

                <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#userLinksOffcanvas" aria-controls="offcanvas">
                    <i className="fa-solid fa-bars"></i>
                </button>
                
                
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <ul className="navbar-nav ms-auto">
                        <li className='nav-item'>
                            <a className={`nav-link ${view === 'home' && 'active'}`} href="/">Home</a>
                        </li>

                        <li className='nav-item'>
                            <a className={`nav-link ${view === 'library' && 'active'}`} href="/library">Library</a>
                        </li>

                        <li className='nav-item'>
                            <a className={`nav-link ${view === 'community' && 'active'}`} href="/community">Community</a>
                        </li>

                        {/* Options Button */}
                        {user && <li className='nav-item dropstart dropdown'>
                            <a className='caret-off dropdown-toggle nav-link active' href="#" role="button" data-toggle='dropdown' data-bs-toggle="dropdown" data-bs-offset="10,20">
                                <i className="fa-solid fa-circle-user fa-xl"></i>
                            </a>

                            <ul className="dropdown-menu custom p-0 of-none">

                                <li><a className={`${dropdownItemCSS} ${view === 'personal' && 'active'}`} href="/account/personal">
                                    <i className="fa-solid fa-user-shield fa-lg me-2"></i>
                                    Personal
                                </a></li>

                                <li><a className={`${dropdownItemCSS} ${view === 'favorites' && 'active'}`} href="/account/favorites">
                                    <i className="fa-solid fa-heart fa-lg me-2"></i>
                                    Favorites
                                </a></li>

                                <li><a className={`${dropdownItemCSS} ${view === 'continue-reading' && 'active'}`} href="/account/continue-reading">
                                    <i className="fa-solid fa-book-bookmark fa-lg me-2"></i>
                                    Continue Reading
                                </a></li>
                                
                                <li><hr className="dropdown-divider"/></li>

                                <li><a className="dropdown-item d-flex align-items-center py-2" href="#" onClick={signOut}>
                                    <i className="fa-solid fa-arrow-right-from-bracket fa-lg me-2 text-danger"></i>
                                    <span className="text-danger">Sign Out</span>
                                </a></li>
                            </ul>
                        </li>}

                        {!user && <li className='nav-item'>
                            <button href="#register" className='nav-link active' data-bs-toggle="modal" data-bs-target={`#${registerModalId}`}>
                                Register
                            </button>
                        </li>}
                    </ul>
                </div>
            </div>
        </nav>

        {/* Side Nav */}
        <div className="offcanvas offcanvas-end" id="userLinksOffcanvas" aria-labelledby="offcanvasExampleLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title fw-bold text-secondary">VBOOKS</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <div className="">
                    <div className="list-group list-group-flush custom mb-4">
                        <label className="text-black mb-3">Navigation</label>

                        <a href="/" className={`${listActionCSS} ${view === 'home' && 'active'}`}>
                            <i className="fa-solid fa-house me-3 fa-lg"></i>
                            Home
                        </a>
                        <a href="/library" className={`${listActionCSS} ${view === 'library' && 'active'}`}>
                            <i className="fa-solid fa-book-open me-3 fa-lg"></i>
                            Library
                        </a>
                        <a href="/community" className={`${listActionCSS} ${view === 'community' && 'active'}`}>
                            <i className="fa-solid fa-users me-3 fa-lg"></i>
                            Community
                        </a>
                    </div>
                    {/* Sidenav Account Options */}
                    <div className="list-group list-group-flush custom mb-4">
                        <label className="text-black mb-3">Account</label>

                        {/* Register Button */}
                        {!user && <button className="list-group-item list-group-item-action" data-bs-toggle="modal" data-bs-target={`#${registerModalId}`}>
                            <i className="fa-solid fa-user me-3 fa-lg"></i>
                            Register</button>}

                        {user && <a href="/account/personal" className={`${listActionCSS} ${view === 'personal' && 'active'}`}>
                            <i className="fa-solid fa-user-shield me-3 fa-lg"></i>
                            Personal
                        </a>}

                        {user && <a href="/account/favorites" className={`${listActionCSS} ${view === 'favorites' && 'active'}`}>
                            <i className="fa-solid fa-heart me-3 fa-lg"></i>
                            Favorites
                        </a>}
                        {user && <a href="/account/continue-reading" className={`${listActionCSS} ${view === 'countinue-reading' && 'active'}`}>
                            <i className="fa-solid fa-book-bookmark me-3 fa-lg"></i>
                            Continue Reading
                        </a>}
                        {user && <a href="#" className="list-group-item list-group-item-action text-danger" onClick={signOut}>
                            <i className="fa-solid fa-arrow-right-from-bracket me-3 fa-lg"></i>
                            Sign Out
                        </a>}
                    </div>
                </div>
            </div>
        </div>

        <RegisterModal nodeId={registerModalId}/>                   

        {children}
    </> );
}
 
export default UserNav;

const listActionCSS = 'list-group-item list-group-item-action';
const dropdownItemCSS = 'dropdown-item d-flex align-items-center py-2'