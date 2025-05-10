import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { dbI } from '../Utils/firebase.util';
import Progress from '../Models/Progress.model';
import { dateNow } from '../Utils/static.util';
import Auth from '../Utils/Auth.firebase';

export default class ProgressDB {
    #key = 'progress';
    #auth = new Auth();

    get #docRef(){
        return doc(dbI, `users/${this.#auth.currentUser.uid}`);
    }
    
    /**
     * Return A List Of Progress
     * @returns {Promise<Array<import('../Models/Progress.model').default>>}
     */
    async list(){
        try {
            if(this.#auth.currentUser){
                let snapshot = await getDoc(this.#docRef);
                let doc = snapshot.data();
                let userInfo = doc[this.#key];
                return userInfo;
            }

            return [];
        } catch (error) {
            console.log(`Database.firebase(progressList:UserDB) --> ${error}`)
            return [];
        }
    }

    /**
     * Update All Books
     * @param {Array<import('../Models/Progress.model').default>} list 
     * @returns {Promise<Boolean>}
     */
    async updateList(list){
        try {
            if(this.#auth.currentUser){
                await updateDoc(this.#docRef, {[this.#key]: JSON.parse(JSON.stringify(list))});
                return true;
            }

            return false;
        } catch (error) {
            console.log(`Database.firebase(setProgressList:UserDB) --> ${error}`)
            return false
        }
    }

    /**
     * Toggle Favorite Book
     * @param {String} bid 
     * @returns {Promise<import('../Models/Progress.model').default>}
     */
    async toggleFavorite(bid){
        try {
            if(this.#auth.currentUser){
                let list = await this.list();
                let ind = list.findIndex((p)=> p.id === bid);
                let mProgress;

                if(ind >= 0){
                    list[ind].isFavorite = !list[ind].isFavorite;
                    mProgress = list[ind] 
                }else{
                    mProgress = Progress.instance({id: bid, index : 1, isFavorite: true, lastUpdate: dateNow() })
                    list.push(mProgress);
                }

                let updated = this.updateList(list);
                return updated ? mProgress : null;
            }

            return null;

        } catch (error) {
            console.log(`Database.firebase(toggleFavorite:UserDB) --> ${error}`)
            return null;
        }
    }

    /**
     * Set Progress
     * @param {import('../Models/Progress.model').default} progress 
     * @returns {Promise<Boolean>}
     */    
    async setProgress(progress){
        try {
            if(this.#auth.currentUser){
                let list = await this.list();
                let ind = list.findIndex((p)=> p.id === progress.id);

                if(ind >= 0){
                    progress.lastUpdate = dateNow();
                    list[ind] = progress;    
                    this.updateList(list);
                }
            }
        } catch (error) {
            console.log(`Database.firebase(setProgress:UserDB) --> ${error}`)
            return false
        }
    }
    
    /**
     * @param {String} id 
     * @returns {import('../Models/Progress.model').default}
     */
    async getByID(id){
        try {
            if(this.#auth.currentUser){
                let list = await this.list();
                let ind = list.findIndex((p)=> p.id === id);

                return list[ind];
            }

        } catch (error) {
            console.log(`Database.firebase(getByID:UserDB) --> ${error}`)
            return null
        }
    }


    /**
     * @param {String} id 
     * @returns {Promise<import('../Models/Progress.model').default>}
     */
    async checkout(id){
        try {
            if(this.#auth.currentUser){
                let list = await this.list();
                let ind = list.findIndex((p)=> p.id === id);
                if(ind >= 0){
                    return list[ind];
                }else {
                    let nProgress = Progress.instance({id: id})
                    list.push(nProgress);
                    await this.updateList(list);
                    return nProgress;
                }
            }
        } catch (error) {
            console.log(`Database.firebase(getByID:UserDB) --> ${error}`)
        }

        return Progress.instance();
    }

    /**
     * Set index
     * @param {String} bid 
     * @param {Number} index 
     * @returns Number
     */
    async setIndex(bid, index){
        if(this.#auth.currentUser){
            let p = await this.checkout(bid);
            if(p){
                p.index = index;
                this.setProgress(p);
            }
        }

        return index;
    }
}