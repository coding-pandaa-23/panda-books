import { useState } from "react";
import AccountSidenav from "../Public/Account.sidenav";
import UserNav from "../Public/User.nav";
import Notifier from "../../Utils/Notifier";

const PersonalView = () => {
    
    const notifier = new Notifier();
    // const userDB = new

    const [user, setUser] = useState();
    const [isLoading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState();

    /**
     * @param {import("firebase/auth").User} mUser 
     */
    function initializeUserInfo(mUser){
        if(mUser){
            
        }else{
            setUserInfo(null);
        }
    }

    return ( <>
        <UserNav view="personal" onUserStateChange={(mUser)=>{
            setUser(mUser);
            initializeUserInfo(mUser);
        }}>
            {/* <AccountSidenav /> */}
            <div className="row m-0">
                <div className="col-12 col-lg-3 h-90 border-end mt-3 d-none d-lg-block">
                    <AccountSidenav user='user'/>
                </div>

                <div className="col-12 col-lg-9 mt-3 h-90 of-auto pb-4 pt-2">
                    <div className="mb-3 p-3">

                        <div className="mb-3">
                            <label for="user-name" class="form-label">User Name</label>
                            <div className="input-group">
                                <input 
                                    id="user-name" type="text" className="form-control custom" placeholder="User Name" 
                                    value={user?.displayName} readOnly/>
                            </div>
                        </div>


                        <div className="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <div className="input-group">
                                <input 
                                    id="email" type="text" className="form-control custom" placeholder="Email Address" 
                                    value={user?.email} readOnly/>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <div className="input-group">
                                <input type="password" className="form-control custom" placeholder="Password" value='XXXXXXXXXX' readOnly/>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label for="birthday" class="form-label">Birthday</label>
                            <div className="input-group">
                                <input id="birthday" type="text" className="form-control custom" placeholder="Birthday" readOnly/>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label for="phone" class="form-label">Phone Number</label>
                            <div className="input-group">
                                <input id="phone" type="text" className="form-control custom" placeholder="Phone Number" readOnly/>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label for="created-at" class="form-label">Account Created</label>
                            <div className="input-group">
                                <input id="created-at" type="text" className="form-control custom" placeholder="Account Created" readOnly/>
                            </div>
                        </div>

                        
                    </div>

                    <div className=" mb-3 p-3">
                        <div className="mb-3">
                            <label for="bio" class="form-label">Bio</label>
                            <div className="input-group">
                                <textarea name="bio" id="bio" className="form-control custom" maxLength={300} placeholder="Type something about you."></textarea>
                            </div>
                        </div>
                    </div>

                    <button className="btn btn-danger w-100">Delete Account</button>
                </div>
            </div>
        </UserNav>
    </> );
}
 
export default PersonalView;