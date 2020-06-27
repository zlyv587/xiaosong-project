const mongoose = require('../db');
const logger = require('../utils/logger');
const Schema = mongoose.Schema;
const to = require('../utils/to');


let UserSchema = new Schema({
  name: { type: String },
  password: { type: String },
}, { timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' } });

UserSchema.query.byName = name => {
  return this.find({ name, });
}
let User = mongoose.model('User', UserSchema);


module.exports = {
  add ({ name, password }) {
    return new Promise((resolve, reject) => {
      User.find().byName(name).exec(async (err, user) => {
        if (err) {
          return reject(err);
        }
        if (user) {
          reject('用户名已存在!')
        } else {
          let user = {
            name,
            password,
          }
          const [err] = await to(User.create(user));
          if (err) {
            return reject(err);
          }
          resolve();
        }
      })
    })
  },
  find(name) {
    return new Promise((resolve, reject) => {
      User.find().byName(name).exec((err, user) => {
        if (err) {
          return reject(err)
        }
        resolve(user)
      })
    })
  }
}
