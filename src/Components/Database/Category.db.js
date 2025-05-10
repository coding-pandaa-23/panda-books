import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { dbI } from '../Utils/firebase.util';
import { generateID } from '../Utils/static.util';

export default class CategoryDB {

    #docRef = doc(dbI, 'public/data');
    #key = 'categories';

    /**
     * Return A List Of categories
     * @returns {Promise<Array<import('../Models/Category.model').default>>}
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
     * @param {Array<import('../Models/Category.model').default>} list 
     * @returns {Promise<Boolean>}
     */
    async updateList(list){
        try {
            list = list.sort((a, b)=> a.title.localeCompare(b.title));
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
     * @returns {Promise<import('../Models/Category.model').default>}
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
     * @param {import('../Models/Category.model').default} category 
     * @returns {Promise<Boolean>}
     */
    async insert(category){
        try {
            let list = await this.list();

            // Check ID
            category.id ??= generateID();

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
     * @param {import('../Models/Category.model').default} category 
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
     * @param {import('../Models/Category.model').default} category 
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
}