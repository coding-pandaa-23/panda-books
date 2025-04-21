import Database from './Database.firebase'

export default class BookDB {

    #key = 'panda-books-database';
    #firebaseBooks;


    constructor(){
        this.#firebaseBooks = new Database().Books
    }

    /**
     * Get Books List
     * @returns {Array<import('./Book.model').default>}
     */
    list(){
        let source = localStorage.getItem(this.#key);
        if(source){
            return JSON.parse(source);
        }

        return [];
    }

    /**
     * Set Books List
     * @param {Array<import('./Book.model').default>} list 
     */
    setList(list){
        let source = JSON.stringify(list);
        localStorage.setItem(this.#key, source);
    }
    
    /**
     * Insert A New Book
     * @param {import('./Book.model').default} book 
     */
    insert(book){
        let list = this.list();
        
        // Check ID
        book.id ??= this.generateID;
        book.lastUpdate = this.dateNow;
        book.index = 1

        // Insert
        list.push(book);
        this.setList(list);
    }

    /**
     * Update A Book
     * @param {import('./Book.model').default} book 
     */
    update(book){
        let list = this.list();
        let ind = list.findIndex((b)=> b.id === book.id);

        if(ind >= 0){
            book.lastUpdate = this.dateNow;
            list[ind] = book;
            this.setList(list)
        }
    }

    /**
     * Delete A Book
     * @param {import('./Book.model').default} book 
     */
    delete(book){
        let list = this.list();
        let ind = list.findIndex((b)=> b.id === book.id);

        if(ind >= 0){
            list.splice(ind, 1);
            this.setList(list)
        }
    }

    /**
     * Get A Book By Book ID
     * @param {String} id Book ID
     * @returns {import('./Book.model').default | null}
     */
    getBookByID(id){
        let list = this.list();
        let ind = list.findIndex((b)=> b.id === id);
        return list[ind];
    }

    /**
     * Generate A Unique ID
     * @returns {String}
     */
    get generateID(){
        return new Date().getTime().toString();
    }

    /**
     * Get Date Now String
     * @returns {String}
     */
    get dateNow(){
        return new Date(Date.now()).toLocaleString();
    }



}

//
// ID
//  Index
// 

