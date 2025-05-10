/**
 * 
 * @param {Object} object 
 * @param {'personal' | 'favorites' | 'continue-reading'}
 */

const AccountSidenav = ({user, view = 'personal', children}) => {
    
    function signOut(){
        // 
    }

    return ( <>
        <div className="list-group list-group-flush custom mb-4 fs-6">
            <label className="text-black mb-3">Account</label>

            {user && <a href="/account/personal" className={`${listActionCSS} ${view === 'personal' && 'active'}`}>
                <div className="d-flex align-items-center justify-content-between">
                    <span>
                        <i className="fa-solid fa-user-shield me-3 fa-lg"></i>
                        Personal
                    </span>
                    {view === 'personal' && <i className="fa-solid fa-chevron-right"></i>}
                </div>
            </a>}

            {user && <a href="/account/favorites" className={`${listActionCSS} ${view === 'favorites' && 'active'}`}>
                <div className="d-flex align-items-center justify-content-between">
                    <span>
                        <i className="fa-regular fa-heart me-3 fa-lg"></i>
                        Favorites
                    </span>
                    {view === 'favorites' && <i className="fa-solid fa-chevron-right"></i>}
                </div>
            </a>}

            {user && <a href="/account/continue-reading" className={`${listActionCSS} ${view === 'countinue-reading' && 'active'}`}>
                
                <div className="d-flex align-items-center justify-content-between">
                    <span>
                        <i className="fa-solid fa-book-bookmark me-3 fa-lg"></i>
                        Continue Reading
                    </span>
                    {view === 'continue-reading' && <i className="fa-solid fa-chevron-right"></i>}
                </div>
            </a>}

            {user && <a href="/help" className={listActionCSS}>
                
                <div className="d-flex align-items-center justify-content-between">
                    <span>
                        <i className="fa-regular fa-circle-question me-3 fa-lg"></i>
                        Help
                    </span>
                </div>
            </a>}

            {user && <a href="#" className="list-group-item list-group-item-action text-danger" onClick={signOut}>
                <i className="fa-solid fa-arrow-right-from-bracket me-3 fa-lg"></i>
                Sign Out
            </a>}
        </div>
    </> );
}
 
export default AccountSidenav;

const listActionCSS = 'list-group-item list-group-item-action border-0 mb-3';
