const User = require('../models/user');




function addUser (name, password) {
  return User.add({ name, password })
}

function login (name, password) {
  return findUser(name).then(user => {
     if (user.password !== password) {
         return Promise.reject()
     } 
     return user
  })
}

function findUser (name) {
  return User.find(name)
}


module.exports = {
  login,
  addUser,
  findUser
}