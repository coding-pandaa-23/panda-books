import { dateNow, generateID } from "../Utils/static.util";

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
        return {
            id: data.id ?? generateID(),
            index : data.index ?? 1,
            lastUpdate : data.lastUpdate ?? dateNow(),
            isFavorite: data.isFavorite ?? false,
        };
    }

}