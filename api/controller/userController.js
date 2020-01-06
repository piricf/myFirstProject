const userService = require('../service/userService');


class userController {

  static createUser(req, res) {


    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    

    let reg = /^[a-zA-Z\-]{3,30}/;
    if (!reg.test(username)) {
      res.status(400).send("username is invalid")
    }

    if (password.length < 5 || password.length > 30) {
      res.status(400).send("password is too small or to big")
    }

    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      res.status(400).send("email is invalid")
    }
    userService.createUser(username, password, email)
      .then(result => {
        res.status(200).send(result)
      })
      .catch(error => {
        res.status(error.httpStatusCode).send(error.message)
      })
  }


  static listUsers(req, res) {

    return new Promise((resolve, reject) => {
      
      userService.listUsers()
        .then(result => {
          res.send(result)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static findUser(req, res) {

    return new Promise((resolve, reject) => {

      let id = req.params.id;
      console.log('users id is:', req.params);

      userService.findUser(id)
        .then(result => {
          res.send(result)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static deleteUser(req, res) {

    return new Promise((resolve, reject) => {

      let id = req.params.id;
      console.log('this user is deleted', req.params);

      userService.deleteUser(id)
        .then(result => {      
          res.send(result)   
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static updateUser(req, res) {

    let payload = {}
    let id = req.params.id;
    if (req.body.username) {
      payload.username = req.body.username
    }
    if (req.body.password) {
      payload.password = req.body.password
    }
    if (req.body.email) {
      payload.email = req.body.email
    }
    console.log(payload);
    userService.updateUser(id, payload)
      .then(result => {
        res.send(result)
      })
      .catch(error => {
        reject(error)
      })
  }


}

module.exports = userController;