import { useState } from "react";
import LoadingWidget from "../../Widgets/Loading.wid";
import Auth from "../../Utils/Auth.firebase";
import Notifier from "../../Utils/Notifier";

/**
 * 
 * @param {Object} object 
 * @param {String} object.nodeId 
 * @returns 
 */
const RegisterModal = ({nodeId = 'registerModal'}) => {
    const auth = new Auth();
    const notifier = new Notifier();

    const [isLoginPage, setIsLoginPage] = useState(true);
    const [userData, setUserData] = useState();
    const [isLoading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false)

    function togglePage(){
        setUserData(null);
        setIsLoginPage(!isLoginPage);
    }

    // Set User Data Input Value
    function onUserValueChanged(e){
        let temp = userData ? JSON.parse(JSON.stringify(userData)) : {};

        let name = e.target.name;
        let value = e.target.value;

        temp[name] = value;

        setUserData(temp);
    }

    // Show/Hide Password
    function togglePassword(){
        setShowPassword(!showPassword);
    }

    // Register
    async function registerUser(e){
        e.preventDefault();

        const mUser = {
            email: userData?.email,
            password: userData?.password,
            confirmPassword: userData?.confirmPassword,
        }
        let user;

        setLoading(true);
        if(!isLoginPage && mUser?.password !== mUser?.confirmPassword){
            registerError('passwords-does-not-match')
        }
        else if(!isLoginPage && mUser?.password === mUser?.confirmPassword){
            user = await auth.createUser(mUser.email, mUser.password, registerError);
        }else if(isLoginPage){
            user = await auth.login(mUser.email, mUser.password, registerError);
        }
        setLoading(false);
        if(user){window.location.reload();}
    }

    function registerError(error){
        if(error.includes('invalid-credential')){
            notifier.toast({message: 'wrong email or password', color: 'danger'})
        }
        else if(error.includes('email-already-in-use')){
            notifier.toast({message: 'email already exists', color: 'danger'})
        }
        else if(error.includes('missing-email')){
            notifier.toast({message: 'email address is required', color: 'danger'})
        }
        else if(error.includes('missing-password')){
            notifier.toast({message: 'password is required', color: 'danger'})
        }
        else if(error.includes('passwords-does-not-match')){
            notifier.toast({message: 'make sure passwords match', color: 'danger'})
        }
            
        else{console.log(error)}
    }
    

    return ( <>
        
        <div className="modal fade" id={nodeId} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <LoadingWidget isLoading={isLoading} type="circle">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{isLoginPage ? 'Login' : 'Create Account'}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={registerUser}>

                                {/* Login Form Data */}
                                {isLoginPage && <div className="login-form-data mb-3">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text border-0 bg-transparent"><i className="fa-solid fa-at"></i></span>
                                        <input 
                                            type="text" className="form-control custom" placeholder="Email"
                                            name="email" value={userData?.email ?? ''} onChange={onUserValueChanged}/>
                                    </div>

                                    <div className="input-group mb-3">
                                        <span className="input-group-text border-0 bg-transparent"><i className="fa-solid fa-lock-open"></i></span>
                                        <input 
                                            type={showPassword ? "text" : "password"} className="form-control custom" placeholder="Password"
                                            name="password" value={userData?.password ?? ''} onChange={onUserValueChanged}/>
                                        <span className="input-group-text border-0 bg-transparent pointer" onClick={togglePassword}>
                                            {showPassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
                                        </span>
                                    </div>

                                    {/* Forget Password */}
                                    <div className="d-flex justify-content-end align-items-center">
                                        <button className="btn btn-sm border-0" type="button">Forget Password!</button>
                                    </div>
                                </div>}

                                {/* Sign Up Form Data */}
                                {!isLoginPage && <div className="sign-up-form-data mb-3">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text border-0 bg-transparent"><i className="fa-solid fa-at"></i></span>
                                        <input 
                                            type="text" className="form-control custom" placeholder="Email"
                                            name="email" value={userData?.email ?? ''} onChange={onUserValueChanged}/>
                                    </div>

                                    <div className="input-group mb-3">
                                        <span className="input-group-text border-0 bg-transparent"><i className="fa-solid fa-lock-open"></i></span>
                                        <input 
                                            type={showPassword ? "text" : "password"} className="form-control custom" placeholder="Password"
                                            name="password" value={userData?.password ?? ''} onChange={onUserValueChanged}/>
                                        <span className="input-group-text border-0 bg-transparent pointer" onClick={togglePassword}>
                                            {showPassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
                                        </span>
                                    </div>

                                    <div className="input-group mb-3">
                                        <span className="input-group-text border-0 bg-transparent"><i className="fa-solid fa-lock-open"></i></span>
                                        <input 
                                            type={showPassword ? "text" : "password"} className="form-control custom" placeholder="Confirm Password"
                                            name="confirmPassword" value={userData?.confirmPassword ?? ''} onChange={onUserValueChanged}/>
                                    </div>
                                </div>}
                                
                                <button type="submit" className="btn btn-primary border-0 w-100 my-3">{isLoginPage ? 'Login' : 'Create Account'}</button>

                            </form>

                            <hr />

                            <div className="text-center mb-3">
                                {!isLoginPage && <small>
                                    Already Have An Account? 
                                    <b className="pointer text-primary ms-1" onClick={togglePage}>Login</b>
                                </small>}
                                
                                {isLoginPage && <small>
                                    Don't Have An Account? 
                                    <b className="pointer text-primary ms-1" onClick={togglePage}>SignUp</b>
                                </small>}
                            </div>

                            <div className="d-flex justify-content-center align-items-center">
                                <button className="btn border-0">
                                    <i className="fa-brands fa-facebook fa-xl text-primary"></i>
                                </button>

                                <button className="btn border-0">
                                    <i className="fa-brands fa-google-plus fa-xl text-danger"></i>
                                </button>

                                <button className="btn border-0">
                                    <i className="fa-brands fa-github fa-xl text-dark"></i>
                                </button>
                            </div>
                        </div>
                    </LoadingWidget>
                </div>
            </div>
        </div>
    </> );
}
 
export default RegisterModal;