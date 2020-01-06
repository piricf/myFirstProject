const loginService = require('../service/loginService')



class loginController {

    static login(req, res) {
        let payload = {
            username: req.body.username,
            password: req.body.password
        };
        if (!payload.username || !payload.password) {
            res.status(400).send('Username and password are missing');
        }
        loginService.login(payload)
            .then(result => {   
                res.status(200).send(result);
            })
            .catch(error => {
                res.status(error.httpStatusCode).send(error.message)
            })
    }
}
module.exports = loginController;
