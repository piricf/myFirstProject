const express = require('express');   
const userController = require('./api/controller/userController');
const bodyParser = require('body-parser'); 
const loginController = require('./api/controller/loginController');


const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.post('/login', loginController.login);
app.post('/newUser',userController.createUser);
app.get('/listUsers',userController.listUsers);
app.get('/findUser/:id',userController.findUser);
app.delete('/deleteUser/:id',userController.deleteUser);
app.put('/updateUser/:id',userController.updateUser);



app.listen(3000, () =>
console.log('Example app listening on port 3000!')
);
