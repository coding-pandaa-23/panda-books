const languages = ['ar', 'en'];

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

export {formateDate, languages, generateID, dateNow}