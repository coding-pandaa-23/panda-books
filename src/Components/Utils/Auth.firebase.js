import { 
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    reauthenticateWithCredential, 
    sendPasswordResetEmail, 
    signInWithEmailAndPassword, 
    signOut,
    updatePassword
} from "firebase/auth";
import { EmailAuthProvider } from "firebase/auth/web-extension";
import { authI } from "./firebase.util";

export default class Auth {

    #auth;

    constructor(){
        this.#auth = authI;
    }

    /**
     * @returns {import("firebase/auth").User}
     */
    get currentUser(){
        return this.#auth.currentUser
    }

    /**
     * @callback UserCallback
     * @param {import("firebase/auth").User | null} user
     */

    /**
     * When User State Changes
     * @param {UserCallback} callback 
     */
    onAuthStateChange(callback){
        onAuthStateChanged(this.#auth, callback);
    }

    /**
     * Sign In With Eamil And Password
     * @param {String} email 
     * @param {String} password 
     * @returns {Promise<import("firebase/auth").User>}
     */
    async login(email, password, onError){
        try {
            let cred = await signInWithEmailAndPassword(this.#auth, email, password);
            return cred.user;
        } catch (error) {
            onError(error.toString());
            return null;
        }
    }

    /**
     * Sign In With Eamil And Password
     * @param {String} email 
     * @param {String} password 
     * @returns {Promise<import("firebase/auth").User>}
     */
    async createUser(email, password, onError){
        try {
            let cred = await createUserWithEmailAndPassword(this.#auth, email, password);
            return cred.user;
        } catch (error) {
            onError(error.toString());
            return null;
        }
    }

    /**
     * Reset Password
     * @param {String} oldPass 
     * @param {String} newPass 
     * @returns {Promise<Boolean>}
     */
    async resetPassword(oldPass, newPass){
        try {
            await reauthenticateWithCredential(this.currentUser, EmailAuthProvider.credential(this.currentUser, oldPass),);
            await updatePassword(this.currentUser, newPass);
            return {success: true, message: 'password was updated'};
        } catch (error) {
            return {success: false, message: 'wrong password'};;
        }
    }

    /**
     * Sent A Password Reset Message To Email Address
     * @param {String} email 
     * @returns {Promise<void>}
     */
    async sendResetPasswordToEmail(email){
        return sendPasswordResetEmail(this.#auth, email);
    }

    /**
     * Signs out the current user.
     * @returns {Promise<void>}
     */
    logout(){
        return signOut(this.#auth)
    }

    
}