import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { dbI } from '../Utils/firebase.util';
import UserInfo from '../Models/UserInfo.model';
import Auth from '../Utils/Auth.firebase';

export default class UserDB {
    #key = 'userInfo';

    #auth = new Auth();

    get #docRef(){
        return this.#auth.currentUser ? doc(dbI, `users/${this.#auth.currentUser.uid}`) : null;
    }

    /**
     * Check if the user is an admin
     * @returns {Promise<Boolean>}
     */
    async isAdmin(){
        let currentUser = this.#auth.currentUser;
        if(currentUser){
            let adminRef = doc(dbI, `admins/${this.#auth.currentUser?.uid}`);
            let snapshot = await getDoc(adminRef);

            return snapshot.data() != null;
        }
    }

    /**
     * 
     * @param {import('firebase/auth').User} firebaseUser 
     */
    async initialize(){
        try {
            let snapshot = this.#docRef && await getDoc(this.#docRef);
            let currentUser = this.#auth.currentUser;


            if(currentUser && snapshot){
                let instance = UserInfo.instance({
                    uid: currentUser.uid,
                    email: currentUser.email,
                    displayName: currentUser.displayName,
                    phone: currentUser.phoneNumber,
                    photoUrl: currentUser.photoURL,
                    createdAt: currentUser.metadata.creationTime,
                });

                if(!snapshot.data()){   // If the Document Does not Exists  
                    await setDoc(this.#docRef, {progress: [], [this.#key] : instance});
                }
                else if(!snapshot.data()?.userInfo){    // If User Field Was not created 
                    await updateDoc(this.#docRef, {[this.#key] : instance});
                }
                else if(!snapshot.data()?.progress){ // If Progress Field Was Not Created
                    await updateDoc(this.#docRef, {['progress'] : []});
                }
            }

        } catch (error) {
            console.log(`Database.firebase(intialize:UserDB) --> ${error}`)
            return false;
        }

        return true;
    }

    /**
     * Get User Information
     * @returns {Promise<import('../Models/UserInfo.model').default | null>}
     */
    async userInfo(){
        try {
            if(this.#auth.currentUser){
                let snapshot = this.#docRef &&  await getDoc(this.#docRef);
                
                if(snapshot){
                    let userInfo;
                    if(snapshot.exists){
                        let doc = snapshot.data();
                        userInfo = doc[this.#key];
                    }else{
                        await setDoc(this.#docRef, userDocTemplate)
                        userInfo = userDocTemplate;
                    }
                
                    return userInfo;
                }
            }

            return null
        } catch (error) {
            console.log(`Database.firebase(userInfo:UserDB) --> ${error}`)
            return null;
        }
    }

    /**
     * Update User Information
     * @param {import('../Models/UserInfo.model').default} data 
     * @returns {Promise<Boolean>}
     */
    async updateUser(data){
        try {
            if(this.#docRef){
                data && await updateDoc(this.#docRef, {[this.#key]: JSON.parse(JSON.stringify(data))});
                return true;
            }else{
                return false;
            }
        } catch (error) {
            console.log(`Database.firebase(updateUser:UserDB) --> ${error}`)
            return false
        }
    }
}

const userDocTemplate = {
    userInfo : {},
    progress : [],
}