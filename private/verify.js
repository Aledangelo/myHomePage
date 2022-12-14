const jwt = require('jsonwebtoken');

module.exports = function (token){

    if(!token) {
        return 401;
    }

    try{
        const verified = jwt.verify(token, 'asdfghjk');
        return 200;

    }catch(err){
        console.log('[ERROR] ' + err);
        return 401;
    }
}