const user = require('../model/user');
const bcrypt = require('bcrypt');

class userService {

    static createUser(username, password, email) {
        return new Promise((resolve, reject) => {
            console.log(username, password, email);
            
            user.find({ username: username })
                .then(foundedUser => {
                    if (foundedUser.length > 0) {
                        reject({ httpStatusCode: 400, message: 'username aldready exists' })
                    } else {
                        return user.find({ email: email })
                    }
                })
                .then(foundedUser => {
                    if (foundedUser.length > 0) {
                        reject({ httpStatusCode: 400, message: 'email aldready exists' })
                    } else {
                        let salt = bcrypt.genSaltSync(10);
                        let hash = bcrypt.hashSync(password, salt);

                        return user.create({ username: username, email: email, password: hash })
                    }
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    console.log(error);
                })
        })
    }

    static listUsers() {
        return new Promise((resolve, reject) => {
            user.find()
                .then(results => {
                    resolve(results)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    static findUser(id) {
        return new Promise((resolve, reject) => {
            user.findById({ _id: id, 'username': username, 'email': email })
                .then(userFound => {
                    resolve(userFound)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    static deleteUser(id) {
        return new Promise((resolve, reject) => {

            user.findByIdAndRemove({ _id: id })
                .then(userDeleted => {
                    resolve(userDeleted)
                    console.log('This user is deleted');

                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    static updateUser(id, payload) {
        console.log('lalalalalallalalalala', id, payload);

        return new Promise((resolve, reject) => {

            user.findByIdAndUpdate(id, payload)
                .then(userUpdated => {
                    console.log(userUpdated);
                    console.log('USER IS UPDATED!');

                    resolve(userUpdated)

                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}

module.exports = userService;