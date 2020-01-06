const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);      



  const schema = new Schema({
    username: String,
    password: String,
    email: String,
    id: String
  });

 

  const user = mongoose.model('users', schema);
   module.exports = user;
 
  

  
