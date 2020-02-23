'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Carga extends Model {
  professor() {
    return this.belongsTo('App/Models/Professor')
  }

  disciplina() {
    return this.belongsTo('App/Models/Disciplina')
  }

  curso() {
    return this.belongsTo('App/Models/Curso')
  }
}

module.exports = Carga
