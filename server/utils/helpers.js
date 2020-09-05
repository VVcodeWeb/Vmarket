module.exports =  isEmpty = string => string.trim() === ''

module.exports = isObjEmpty= obj => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

module.exports = uploadImage = a => {
    
}