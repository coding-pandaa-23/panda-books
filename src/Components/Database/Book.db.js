import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { dbI } from '../Utils/firebase.util';
import { dateNow, generateID } from '../Utils/static.util';
import StorageUtil from '../Utils/storage.util';

export default class BookDB {
    #docRef = doc(dbI, 'public/data');
    #key = 'books';
    #storage;

    constructor(){
        this.#storage = new StorageUtil();
    }

    /**
     * Return A List Of Books
     * @returns {Promise<Array<import('../Models/Book.model').default>>}
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
     * @param {Array<import('../Models/Book.model').default>} list 
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
     * @returns {Promise<import('../Models/Book.model').default | null>}
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
     * @callback StateCallback
     * @param {UploadTaskSnapshot} progress
     * @param {Boolean} completed
     * @param {String} downloadLink
     */

    /**
     * Insert A New Book
     * @param {object} data
     * @param {import('../Models/Book.model').default} data.book 
     * @param {File} data.pdf 
     * @param {File} data.cover 
     * @param {StateCallback} data.onProgressChanged 
     * @returns {Promise<Boolean>}
     */
    
    async insert(data){
        try {
            let list = await this.list();
            
            // Check Cover File
            if(!data.cover && !data.book.coverUrl){
                throw JSON.stringify({
                    type: 'internal-error',
                    reason: 'missing-data',
                    message: 'Cover File was not found',
                })
            }

            // Check PDF File
            if(!data.pdf && !data.book.url){
                throw JSON.stringify({
                    type: 'internal-error',
                    reason: 'missing-data',
                    message: 'PDF File was not found',
                })
            }

            // Check ID
            data.book.id ??= generateID();

            // Set Last Update
            data.book.lastUpdate = dateNow();

            // Upload Cover
            let coverUrl = await this.#storage.uploadFile({ path: `/public/covers/${data.book.id}.png`, file: data.cover,});
            data.book.coverUrl = coverUrl;

            // Upload Book
            let bookUrl = await this.#storage.uploadFile({
                path: `/public/books/${data.book.id}.pdf`,
                file: data.pdf,
                onStateChanged: ((progress, completed, downloadLink)=>{
                    if(completed){
                        data.onProgressChanged(progress, completed, downloadLink);
                    }else{
                        data.onProgressChanged(progress)
                    }
                })
            })

            data.book.url = bookUrl;

            // Update List
            list.push(data.book);
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
     * @param {object} data
     * @param {import('../Models/Book.model').default} data.book 
     * @param {File} data.pdf 
     * @param {File} data.cover 
     * @param {StateCallback} data.onProgressChanged 
     * @returns {Promise<Boolean>}
     */
    async update(data){
        try {
            let list = await this.list();

            // Check Cover File
            if(!data.cover && !data.book.coverUrl){
                throw JSON.stringify({
                    type: 'internal-error',
                    reason: 'missing-data',
                    message: 'Cover File was not found',
                })
            }

            // Check PDF File
            if(!data.pdf && !data.book.url){
                throw JSON.stringify({
                    type: 'internal-error',
                    reason: 'missing-data',
                    message: 'PDF File was not found',
                })
            }

            // Check Date
            data.book.lastUpdate = dateNow();

            // Check if there is a new Cover File
            if(data.cover){
                // Upload Cover
                let coverUrl = await this.#storage.uploadFile({ path: `/public/covers/${data.book.id}.png`, file: data.cover,});
                data.book.coverUrl = coverUrl;
            }

            // Check if there is a new PDF File
            if(data.pdf){
                // Upload Book
                let bookUrl = await this.#storage.uploadFile({
                    path: `/public/books/${data.book.id}.pdf`,
                    file: data.pdf,
                    onStateChanged: ((progress, completed, downloadLink)=>{
                        data.onProgressChanged(progress)
                    })
                })

                data.book.url = bookUrl;
            }
            
            let ind = list.findIndex((b)=> b.id === data.book.id);

            if(ind >= 0){
                list[ind] = data.book;
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
     * @param {import('../Models/Book.model').default} book 
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
}