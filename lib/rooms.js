const EventEmitter = require('events')
const emitter = new EventEmitter()
const db = {}

const rooms = {
  on (type, handler) {
    emitter.on(type, handler)
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
      db[name] = { name }

      emitter.emit('created', name)
    }

    return rooms.get(name)
  },

  remove (name) {
    delete db[name]

    emitter.emit('removed', name)
  }
}

module.exports = rooms
