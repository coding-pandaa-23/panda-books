import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { dbI } from "../Utils/firebase.util";
import Auth from "../Utils/Auth.firebase";
import BookDB from "./Book.db";
import CategoryDB from "./Category.db";
import ProgressDB from "./Progress.db";
import UserDB from './User.db';

export default class DB{
    
    #auth;

    #bookDB;
    #categoryDB;
    #progressDB;
    #userDB;

    constructor(){
        this.#auth = new Auth();
    }

    get #publicRef(){
        return doc(dbI, 'public/data');
    }

    // get #userRef(){
    //     return this.#auth.currentUser == null ? null : doc(dbI, `users/${this.#auth.currentUser.uid}`);
    // }

    /**
     * @callback PublicStreamCallback
     * @param {Array<import('../Models/Book.model').default>} books
     * @param {Array<import('../Models/Category.model').default>} categories
     */

    /**
     * Stream Library
     * @param {PublicStreamCallback} callback 
     */
    publicStream(callback){
        try {
            onSnapshot(this.#publicRef, (snapshot)=>{
                let data = snapshot.data() ?? {};
                callback(data['books'] ?? [], data['categories'] ?? []);
            })
        } catch (error) {
            return null
        }
    }

    /**
     * @callback UserStreamCallback
     * @param {import('../Models/UserInfo.model').default} userInfo
     * @param {Array<import('../Models/Progress.model').default>} progress
     */


    /**
     * Stream Library
     * @param {UserStreamCallback} callback 
     */
    userStream(callback){
        this.#auth.onAuthStateChange((user)=>{
            if(user){
                let ref = doc(dbI, `users/${user.uid}`)
                onSnapshot(ref, (snapshot)=>{
                    let data = snapshot.data() ?? {};
                    callback(data['userInfo'], data['progress'] ?? []);
                });
            }else{
                callback(null, []);
            }
        })
    }

    static async isAdmin(uid){
        try {
            let snapshot = await getDoc(doc(dbI, `admins/${uid}`));
            return snapshot.data() != null;
        } catch (error) {
            throw error;
        }
    }

    /**
     * @returns {import('./Book.db').default}
     */
    get Books(){
        return this.#bookDB ??= new BookDB();
    }

    /**
     * @returns {import('./Category.db').default}
     */
    get Categories(){
        return this.#categoryDB ??= new CategoryDB();
    }
    
    /**
     * @returns {import('./Progress.db').default}
     */
    get Progress(){
        return this.#progressDB ??= new ProgressDB();
    }

    /**
     * @returns {import('./User.db').default}
     */
    get User(){
        return this.#userDB ??= new UserDB();
    }

    
}