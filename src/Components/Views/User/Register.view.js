import { useState } from "react";
import Notifier from "../../Utils/Notifier";
import Auth from "../../Utils/Auth.firebase";

const RegisterView = () => {

    let auth = new Auth();
    let notifier = new Notifier()

    const [loginForm, setLoginForm] = useState(true);

    let [user, setUser] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    let [showPassword, setShowPassword] = useState(false);

    function getTemp(object){
        return JSON.parse(JSON.stringify(object))
    }

    function register(e){
        e.preventDefault();
        loginForm ? login() : createUser();
    }

    async function login(){
        notifier.setLoading(true);
        try {
            await auth.login(user.email, user.password);
        } catch (error) {
            if(error.toString().includes('invalid-credential')){
                notifier.toast({message: 'wrong email/password', color: 'danger'});
            }else if(error.toString().includes('email-already-in-use')){
                notifier.toast({message: 'email already exists', color: 'danger'});
            }
        }
        notifier.setLoading(false);
    }


    async function createUser(){
        notifier.setLoading(true);
        try {
            if(user.password === user.confirmPassword){
                await auth.createUser(user.email, user.password);
            }else{
                notifier.toast({message: 'passwords does not match', color: 'danger'});
            }
        } catch (error) {
            if(error.toString().includes('email-already-in-use')){
                notifier.toast({message: 'email already exists', color: 'danger'});
            }
            // notifier.toast({message: error, color: 'danger'});
        }
        notifier.setLoading(false);
    }

    function forgetPassword(){
        notifier.showTextDialog({
            message: 'Enter Email Address!',
            hint: 'example@example.com',
            confirmText: 'Send',
            onConfirm: (value)=>{
                auth.sendResetPasswordToEmail(value)
                .then(()=>{notifier.toast({message: 'A Password Reset Was Sent To Your Email'})})
                .catch(()=>{notifier.toast({message: 'Somthing Went Wrong', color: 'danger'})})
            }
        })
    }

    function onInputValueChange(e){
        let name = e.target.name;
        let value = e.target.value;

        let temp = getTemp(user);
        temp[name] = value;

        setUser(temp);
    }

    function toggleView(){
        setLoginForm(!loginForm);
    }

    return ( <>
        <div className="admin-register-view h-90 d-flex align-items-center justify-content-center">
           <div className="w-100">
                <div className="row">
                    <div className="col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                        <div className="card border-0 shadow-lg register-form">
                            <div className="card-body">
                                <div className="fs-3 text-center mb-5 ff-custom text-primary fw-bold">
                                    {loginForm ? 'Login' : 'Sign Up'}
                                </div>

                                <form onSubmit={register}>
                                    {/* Email */}
                                    <div className="input-group mb-3 rounded">
                                        <span className="input-group-text border-0 bg-transparent pe-1 highlight" id="basic-addon1">
                                            <i className="fa-solid fa-at"></i>
                                        </span>
                                        <input 
                                            className="form-control custom" placeholder="Email" type="email" required
                                            name='email' value={user.email} onChange={onInputValueChange}/>
                                    </div>

                                    {/* Password */}
                                    <div className="input-group mb-3 rounded">
                                        <span className="input-group-text border-0 bg-transparent pe-1 highlight" id="basic-addon1">
                                            <i className="fa-solid fa-lock-open"></i>
                                        </span>

                                        <input 
                                            className="form-control custom" placeholder="Password" name="password" required
                                            type={showPassword ? 'text' : 'password'} value={user.password} onChange={onInputValueChange}/>

                                        <span 
                                            className="input-group-text border-0 pointer bg-transparent" 
                                            onClick={()=>{setShowPassword(!showPassword)}}>
                                            { showPassword ? (<i className="fa-solid fa-eye text-primary"></i>)
                                            :(<i className="fa-solid fa-eye-slash text-secondary"></i>)}
                                        </span>
                                    </div>

                                   {loginForm && <div className="d-flex justify-content-end mb-3">
                                        <small className="hoverable p-1 px-3 rounded" onClick={forgetPassword}>Forget password?</small>
                                    </div>}

                                    {/* Confirm Password */}
                                    {!loginForm && <div className="input-group mb-3 rounded">
                                        <span className="input-group-text border-0 bg-transparent pe-1 highlight" id="basic-addon1">
                                            <i className="fa-solid fa-lock-open"></i>
                                        </span>

                                        <input 
                                            className="form-control custom" placeholder="Confirm Password" required
                                            type={showPassword ? 'text' : 'password'} name='confirmPassword'
                                            value={user.confirmPassword} onChange={onInputValueChange}/>
                                    </div>}


                                    {/* Register Button */}
                                    <div className="mb-3">
                                        <button className="btn btn-primary w-100" type="submit">
                                            {loginForm ? 'Login' : 'Sign Up'}
                                        </button>
                                    </div>


                                    <hr />

                                   {!loginForm && <div className="text-center">
                                        <span>Already Have An Account?</span>
                                        <code className="ms-2 pointer" onClick={toggleView}>Login</code>
                                    </div>}

                                    {loginForm && <div className="text-center">
                                        <span>Don't Have An Account?</span>
                                        <code className="ms-2 pointer" onClick={toggleView}>Sign Up</code>
                                    </div>}



                                </form>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
        </div>
    </> );
}
 
export default RegisterView;