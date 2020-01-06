const user = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


class loginService {

    static login(payload) {
        return new Promise((resolve, reject) => {
            user.find({ username: payload.username })
                .then(foundedUser => {
                    if (!foundedUser.length > 0) {
                        reject({ httpStatusCode: 400, message: 'Username is not founded' })
                    } else {
                        let isMatch = bcrypt.compareSync(payload.password, foundedUser[0].password);
                        if (!isMatch) {
                            reject({ httpStatusCode: 400, message: 'Password is incorrect' })
                        }else{
                            let token = jwt.sign({ foundedUser}, 'SecretKey');
                            resolve({token, message:'login successfull'})
                        }

                    }
                })
                .catch(error => {
                    console.log(error);

                })

        })
    }

}

module.exports = loginService;