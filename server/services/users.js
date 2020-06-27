const User = require('../models/user');




function addUser (username, password) {
  return User.add({ username, password })
}

function login (username, password) {
  return findUser(username).then(user => {
     if (user.password !== password) {
         return Promise.reject()
     }
  })
}

function findUser (username) {
  return User.find(username)
}


module.exports = {
  login,
  addUser,
  findUser
}