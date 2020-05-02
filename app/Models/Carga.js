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

  turma() {
    return this.belongsTo('App/Models/Turma')
  }
}

module.exports = Carga
