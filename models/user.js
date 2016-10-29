const MongoBaseModel = require('./mongobase')

class UserModel extends MongoBaseModel {
  init(collection) {
    this.collection = collection
    this.collection.createIndex({email: 1}, {unique: true}).then()
  }

  getByEmail(email) {
    return this.collection.findOne({email: email})
  }
}

module.exports = UserModel



/*
const BaseModel = require('./base')
const PREFIX_EMAIL_TO_ID = 'email-id:'

class UserModel extends BaseModel {
  constructor(store) {
    super(store, 'user:')
  }

  create(obj) {
    return super.create(obj).then((id) => {
      return this.store.set(PREFIX_EMAIL_TO_ID + obj.email, id).then(() => id)
    })
  }

  async getByEmail(email) {
    const id = await this.store.get(PREFIX_EMAIL_TO_ID + email)
    return await this.get(id)
  }
}

module.exports = UserModel
*/
