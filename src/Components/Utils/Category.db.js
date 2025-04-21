export default class CategoryDB {

    #key = 'panda-categories-database';

    /**
     * Get Categorys List
     * @returns {Array<Category>}
     */
    list(){
        let source = localStorage.getItem(this.#key);
        if(source){
            return JSON.parse(source);
        }

        return [];
    }

    /**
     * Set Categorys List
     * @param {Array<Category>} list 
     */
    setList(list){
        let source = JSON.stringify(list);
        localStorage.setItem(this.#key, source);
    }
    
    /**
     * Insert A New Category
     * @param {Category} Category 
     */
    insert(category){
        let list = this.list();
        
        // Check ID
        category.id ??= this.generateID;

        // Insert
        list.push(category);
        this.setList(list);
    }

    /**
     * Update A Category
     * @param {Category} Category 
     */
    update(category){
        let list = this.list();
        let ind = list.findIndex((b)=> b.id === category.id);

        if(ind >= 0){
            category.lastUpdate = this.dateNow;
            list[ind] = category;
            this.setList(list)
        }
    }

    /**
     * Delete A Category
     * @param {Category} Category 
     */
    delete(category){
        let list = this.list();
        let ind = list.findIndex((b)=> b.id === category.id);

        if(ind >= 0){
            list.splice(ind, 1);
            this.setList(list)
        }
    }

    /**
     * Get A Category By Category ID
     * @param {String} id Category ID
     * @returns {Category | null}
     */
    getCategoryByID(id){
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

// eslint-disable-next-line
class Category {
    /**@type {String} */ id;
    /**@type {String} */ title;
}