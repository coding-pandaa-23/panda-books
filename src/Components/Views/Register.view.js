import { useState } from "react";
import Notifier from "../Utils/Notifier";
import Auth from "../Utils/Auth.firebase";

const RegisterView = () => {

    let auth = new Auth();
    let notifier = new Notifier();

    let [email, setEmail] = useState();
    let [password, setPassword] = useState();
    let [showPassword, setShowPassword] = useState(false);

    function submitForm(e){
        e.preventDefault();
        notifier.setLoading(true);
        auth.login(email, password)
        .then((user)=>{notifier.setLoading(false);})
        .catch((err)=>{
            let error = err.toString()
            if(error.includes('user-not-found')){
                notifier.toast({message: 'Wrong Email Address', color: 'danger'});
            }else{
                notifier.toast({message: 'Somthing Went Wrong', color: 'danger'});
            }
            notifier.setLoading(false); 
        })
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

    return ( <>
        <div className="admin-register-view h-100 d-flex align-items-center justify-content-center bg-light">
           <div className="w-100">
                <div className="row">
                    <div className="col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                        <div className="card border-0 shadow-lg register-form">
                            <div className="card-body">
                                <div className="fs-3 text-center mb-5 ff-custom text-primary fw-bold">Register</div>

                                <form onSubmit={submitForm}>
                                    {/* Email */}
                                    <div className="input-group mb-3 rounded">
                                        <span className="input-group-text border-0 bg-transparent pe-1 highlight" id="basic-addon1">
                                            <i className="fa-solid fa-at"></i>
                                        </span>
                                        <input 
                                            className="form-control custom" 
                                            placeholder="Email"
                                            type="email" required
                                            value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                                    </div>

                                    {/* Password */}
                                    <div className="input-group mb-2 rounded">
                                        <span className="input-group-text border-0 bg-transparent pe-1 highlight" id="basic-addon1">
                                            <i className="fa-solid fa-lock-open"></i>
                                        </span>

                                        <input 
                                            className="form-control custom" 
                                            placeholder="Password" required
                                            type={showPassword ? 'text' : 'password'}
                                            value={password} onChange={(e)=>{setPassword(e.target.value)}}/>

                                        <span 
                                            className="input-group-text border-0 pointer bg-transparent" 
                                            onClick={()=>{setShowPassword(!showPassword)}}>
                                            { showPassword ? (<i className="fa-solid fa-eye text-primary"></i>)
                                            :(<i className="fa-solid fa-eye-slash text-secondary"></i>)}
                                        </span>
                                    </div>

                                    <div className="d-flex justify-content-end mb-5">
                                        <small className="hoverable p-1 px-3 rounded" onClick={forgetPassword}>Forget password?</small>
                                    </div>


                                    <div className="mb-3">
                                        <button className="btn btn-primary w-100" type="submit">Login</button>
                                    </div>

                                    <div className="mb-3 text-center">
                                        <a href="/" className="btn border-0">
                                            <i className="fa-solid fa-house fa-xl"></i>
                                        </a>
                                    </div>
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