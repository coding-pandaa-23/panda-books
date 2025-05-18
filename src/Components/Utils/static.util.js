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

const emptyCoverUrlSqr = 'https://firebasestorage.googleapis.com/v0/b/panda-books-25.firebasestorage.app/o/public%2Fcovers%2Fempty-book.png?alt=media&token=67bdd65a-89cf-4bee-849b-fae00c518401'
const emptyCoverUrl = 'https://firebasestorage.googleapis.com/v0/b/panda-books-25.firebasestorage.app/o/public%2Fcovers%2Fempty-book.jpg?alt=media&token=b6b3060c-c1a5-4ac3-9d96-1fe397e71fa1'

export {formateDate, languages, generateID, dateNow, bookStatus, emptyCoverUrl, emptyCoverUrlSqr}