const EventEmitter = require('events')
const emitter = new EventEmitter()
const db = {}

const rooms = {
  on (type, handler) {
    emitter.addListener(type, handler)
  },

  off (type, handler) {
    emitter.removeListener(type, handler)
  },

  get (name) {
    return db[name]
  },

  getAll () {
    return Reflect.ownKeys(db)
      .map((key) => db[key])
  },

  upsert (name) {
    if (!db[name]) {
      db[name] = { name, users: [] }

      emitter.emit('created', name)
    }

    return rooms.get(name)
  },

  remove (name) {
    delete db[name]

    emitter.emit('removed', name)
  },

  addToRoom (name, user) {
    db[name].users.push(user)

    emitter.emit('users:added', {
      name,
      user
    })
  },

  removeFromRoom (name, user) {
    db[name].users = db[name].users.filter((userInRoom) => userInRoom.name !== user.name)

    emitter.emit('users:removed', {
      name,
      user
    })
  }
}

module.exports = rooms
