function formateDate(date){
    let dt = ((date ?? '') === '') ? Date.now() : date;
    return new Date(dt).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })
}


export {formateDate}