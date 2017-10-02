const db = {}

const users = {
  get (name) {
    return db[name]
  },

  upsert (name, data) {
    if (!db[name]) {
      db[name] = data || { name }
    }

    return users.get(name)
  }
}

module.exports = users
