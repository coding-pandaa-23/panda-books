import { dateNow, generateID } from "../Utils/static.util";

export default class UserInfo {
    /** @type {String} */ uid;
    /** @type {String} */ displayName;
    /** @type {String} */ email;
    /** @type {String} */ phone;
    /** @type {String} */ birthday;
    /** @type {String} */ photoUrl;
    /** @type {String} */ bio;
    /** @type {String} */ createdAt;

    /**
     * @param {Object} data 
     * @param {String} data.uid 
     * @param {String} data.displayName 
     * @param {String} data.email 
     * @param {String  | null} data.phone 
     * @param {String  | null} data.photoUrl 
     * @param {String | null} data.birthday 
     * @param {String  | null} data.bio 
     * @param {String} data.createdAt 
     * 
     */
    static instance(data){
        return JSON.parse(JSON.stringify({
            uid: data.uid,
            displayName: data.displayName ?? `User-${generateID()}`,
            email: data.email,
            phone: data.phone ?? null,
            photoUrl: data.photoUrl ?? null,
            birthday: data.birthday ?? null,
            bio: data.bio ?? null,
            createdAt: data.createdAt ?? dateNow() ,
        }))
    }

}