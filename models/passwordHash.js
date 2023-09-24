const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = ( password )=>{

    return bcrypt.hash(password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        if ( err){
            throw new Error (err.message)
        }
        return hash 
    });
    
}

const checkPassword = (password) => {
    return bcrypt.compare(password, hash, function(err, result) {
        // result == true
        return result
    });
}

module.exports ={ hashPassword , checkPassword}