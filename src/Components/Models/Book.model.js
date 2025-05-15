import { dateNow, generateID } from "../Utils/static.util";

export default class Book {
     /** @type {String} */ id;
    /** @type {String} */ title;
    /** @type {String} */ author;
    /** @type {String} */ rate;
    /** @type {String} */ desc;
    /** @type {String} */ isbn;
    /** @type {String} */ publisher;
    /** @type {String} */ publicationDate;
    /** @type {String} */ language;
    /** @type {String} */ lastUpdate ;
    /** @type {Object} */ extras ;
    /** @type {String} */ category ;
    /** @type {String} */ numberOfPages ;
    
    /** @type {String} */ url;
    /** @type {String} */ coverUrl;

    /**
     * 
     * @param {Object} data 
     * @param {String} data.id
     * @param {String} data.title
     * @param {String} data.author
     * @param {String} data.rate
     * @param {String} data.desc
     * @param {String} data.numberOfPages
     * @param {String} data.isbn
     * @param {String} data.publisher
     * @param {String} data.publicationDate
     * @param {String} data.language
     * @param {String} data.lastUpdate
     * @param {Object} data.extras
     * @param {String} data.category
     * @param {String} data.url
     * @param {String} data.coverUrl
     */

    static instance({
        id, 
        title, 
        author, 
        rate, 
        desc, 
        numberOfPages, 
        isbn, 
        publisher, 
        publicationDate, 
        language, 
        lastUpdate, 
        extras, 
        category, 
        url, 
        coverUrl
    }){
        return {
            id: id ?? generateID(),
            title: title,
            author: author,
            rate: rate,
            desc: desc,
            isbn: isbn,
            publisher: publisher,
            publicationDate: publicationDate,
            numberOfPages: numberOfPages ?? 1,
            language: language ?? 'en',
            lastUpdate: lastUpdate ?? dateNow(),
            extras: extras,
            category: category,
            url: url,
            coverUrl: coverUrl,
        }
    }
}
