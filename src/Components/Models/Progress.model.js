export default class Progress {

    /** @type {String} Book ID */ id;
    /** @type {String} */ lastUpdate;
    /** @type {Number} */ index = 1; // if the index quals 1 => it means the book was not touched otherwise it is active
    /** @type {Boolean} */ isFavorite = false;

    /**
     * 
     * @param {Object} data 
     * @param {String} data.id
     * @param {String} data.lastUpdate
     * @param {String} data.index
     * @param {String} data.isFavorite
     */
    static instance(data ){
        return data;
    }

}