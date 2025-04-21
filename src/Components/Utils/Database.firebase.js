import {doc, getDoc, onSnapshot, updateDoc} from 'firebase/firestore';
import { dbI } from './firebase.util';
import StorageUtil from './storage.util';

export default class Database {

    #docRef = doc(dbI, 'public/data');

    #bookDB;
    #categoriesDB;

    constructor(){
        this.#bookDB = new BooksDB();
        this.#categoriesDB = new CategoriesDB();
        
    }
    
    /**
    * Get Books Database Instance 
    * @returns {BooksDB}
    * */
    get Books(){
        return  this.#bookDB;
    }

    /**
    *  Get Categories Database Instance
    * @returns {CategoriesDB}
    *  */
    get Categories(){
        return  this.#categoriesDB;
    }


    /**
     * @callback SnapshotCallback
     * @param {Array<import('./Book.model')>} books 
     * @param {Array<import('./Category.model')>} categories 
     */


    /**
     * On Data Changes
     * @param {SnapshotCallback} callback 
     */


    snapshot(callback){
        onSnapshot(this.#docRef, (snapshot)=>{
            let data = snapshot.data();
            callback(data['books'] ?? [], data['categories'] ?? []);
        })
    }

    
}

class BooksDB {

    #docRef = doc(dbI, 'public/data');
    #key = 'books';
    #storage;

    constructor(){
        this.#storage = new StorageUtil();
    }

    /**
     * Return A List Of Books
     * @returns {Promise<Array<import('./Book.model').default>>}
     */
    async list(){
        try {
            let snapshot = await getDoc(this.#docRef);

            let doc = snapshot.data();
            let books = doc[this.#key];
            return books;
        } catch (error) {
            console.log(`Database.firebase(list:BooksDB) --> ${error}`)
            return [];
        }
    }

    /**
     * Update All Books
     * @param {Array<import('./Book.model').default>} list 
     * @returns {Promise<Boolean>}
     */
    async updateList(list){
        try {
            list = list.sort((a,b) => a.title.localeCompare(b.title));
            await updateDoc(this.#docRef, {[this.#key]: JSON.parse(JSON.stringify(list))});
            return true;
        } catch (error) {
            console.log(`Database.firebase(updateList:BooksDB) --> ${error}`)
            return false
        }
    }

    /**
     * Find A Book By ID
     * @param {String} id 
     * @returns {Promise<import('./Book.model').default | null>}
     */
    async findBookByID(id){
        try {
            let list = await this.list();
            let ind = list.findIndex((b)=> b.id === id);
            if(ind >= 0){
                return list[ind];
            }

            return null;
            
        } catch (error) {
            console.log(`Database.firebase(findBookByID:BooksDB) --> ${error}`)
        }

        return null;
    }

    /**
     * Insert A New Book
     * @param {import('./Book.model').default} book 
     * @returns {Promise<Boolean>}
     */
    async insert(book, file){
        try {
            let list = await this.list();

            // Check ID
            book.id ??= this.generateID;
            book.lastUpdate = this.dateNow;

            // Upload Book and grap Download Link
            if(file && !book.url){
                let downloadLink = await this.#storage.uploadBook(book.id, file);
                book.url = downloadLink;
            }else{
                throw JSON.stringify({
                    type: 'internal-error',
                    reason: 'missing-data',
                    message: 'PDF File was not found',
                })
            }

            // Update List
            list.push(book);
            return this.updateList(list);

        } catch (error) {
            if(error.includes('internal-error')){
                throw error;
            }else{
                JSON.stringify({
                    type: 'server-error',
                    reason: '',
                    message: error,
                })
            }
        }
    }

    /**
     * Update A Book
     * @param {import('./Book.model').default} book 
     * @returns {Promise<Boolean>}
     */
    async update(book, file){
        try {
            let list = await this.list();

            // Check Date
            book.lastUpdate = this.dateNow;

            // Check file and upload it
            if(file){
                let downloadLink = await this.#storage.uploadBook(book.id, file);
                book.url = downloadLink;
            }
            
            let ind = list.findIndex((b)=> b.id === book.id);

            if(ind >= 0){
                list[ind] = book;
                return this.updateList(list);
            }
            
        } catch (error) {
            throw JSON.stringify({
                type: 'server-error',
                reason: '',
                message: error,
            })
        }

        return false;
    }

     /**
     * Delete A Book
     * @param {import('./Book.model').default} book 
     * @returns {Promise<Boolean>}
     */
    async delete(book){
        try {
            let list = await this.list();

            // Check Date
            let ind = list.findIndex((b)=> b.id === book.id);

            if(ind >= 0){
                list.splice(ind, 1)
                return this.updateList(list);
            }
        } catch (error) {
            console.log(`Database.firebase:(delete:BooksDB) --> ${error}`)
        }

        return false;
    }

    // Generate ID
    get generateID(){
        return new Date().getTime().toString()
    }

    // Date Now
    get dateNow(){
        return new Date().toLocaleString();
    }
}


// Category Class
// =====================================================================================
class CategoriesDB {

    #docRef = doc(dbI, 'public/data');
    #key = 'categories';

    /**
     * Return A List Of categories
     * @returns {Promise<Array<import('./Category.model').default>>}
     */
    async list(){
        try {
            let snapshot = await getDoc(this.#docRef);

            let doc = snapshot.data();
            let categories = doc[this.#key];
            return categories;
        } catch (error) {
            console.log(`Database.firebase:(list:CategoriesDB) --> ${error}`)
            return [];
        }
    }

    /**
     * Update All categories
     * @param {Array<import('./Category.model').default>} list 
     * @returns {Promise<Boolean>}
     */
    async updateList(list){
        try {
            await updateDoc(this.#docRef, {[this.#key]: list});
            return true;
        } catch (error) {
            console.log(`Database.firebase:(updateList:CategoriesDB) --> ${error}`)
            return false
        }
    }

    /**
     * Find A Category By ID
     * @param {String} id 
     * @returns {Promise<import('./Category.model').default>}
     */
    async findCategoryByID(id){
        try {
            let list = await this.list();
            let ind = list.findIndex((c)=> c.id === id);
            if(ind >= 0){
                return list[ind];
            }
            
        } catch (error) {
            console.log(`Database.firebase:(findCategoryByID:CategoriesDB) --> ${error}`)
        }

        return null;
    }

    /**
     * Insert A New Category
     * @param {import('./Category.model').default} category 
     * @returns {Promise<Boolean>}
     */
    async insert(category){
        try {
            let list = await this.list();

            // Check ID
            category.id ??= this.generateID;

            // Insert Category Into List
            list.push(category);
            return this.updateList(list);
        } catch (error) {
            console.log(`Database.firebase:(insert:CategoriesDB) --> ${error}`)
            return false;
        }
    }

    /**
     * Update A Category
     * @param {import('./Category.model').default} category 
     * @returns {Promise<Boolean>}
     */
    async update(category){
        try {
            let list = await this.list();

            // Check Date
            let ind = list.findIndex((c)=> c.id === category.id);

            if(ind >= 0){
                list[ind] = category;
                return this.updateList(list);
            }
            
        } catch (error) {
            console.log(`Database.firebase:(update:CategoriesDB) --> ${error}`)
        }

        return false;
    }

     /**
     * Delete A Category
     * @param {import('./Category.model').default} category 
     * @returns {Promise<Boolean>}
     */
    async delete(category){
        try {
            let list = await this.list();

            // Check Date
            let ind = list.findIndex((c)=> c.id === category.id);

            if(ind >= 0){
                list.splice(ind, 1)
                return this.updateList(list);
            }
        } catch (error) {
            console.log(`Database.firebase:(delete:CategoriesDB) --> ${error}`)
        }

        return false;
    }

    // Generate ID
    get generateID(){
        return new Date().getTime().toString()
    }

    // Date Now
    get dateNow(){
        return new Date().toLocaleString();
    }
}