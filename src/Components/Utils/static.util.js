const languages = ['en', 'ar'];

/**
 * @typedef {Object} BookStatus 
 * @param {String} bookStatus.unread
 * @param {String} bookStatus.readingNow
 * @param {String} bookStatus.finished
 */

/** @type {{unread : 'Unread', readingNow :'Reading Now', finished: 'Finished', values: ()=> ['unread', 'readingNow', 'finished']}} */
const bookStatus = {unread : 'Unread', readingNow :'Reading Now', finished: 'Finished', values: ()=> ['unread', 'readingNow', 'finished']}

function formateDate(date){
    let dt = ((date ?? '') === '') ? Date.now() : date;
    return new Date(dt).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })
}

// Generate ID
function generateID(){
    return new Date().getTime().toString()
}

// Date Now
function dateNow(){
    return new Date().toLocaleString();
}

export {formateDate, languages, generateID, dateNow, bookStatus}